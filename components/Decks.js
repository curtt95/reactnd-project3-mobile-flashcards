import React, { Component } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { blue, orange } from '../utils/colors'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { TouchableOpacity } from 'react-native-gesture-handler'

/**
 * Decks component
 */
class Decks extends Component {
  state = { // initial state
    ready: false
  }

  /**
   * @description code to run when the component mounts
   */
  componentDidMount() {
    const { dispatch } = this.props // get dispatch from props

    // call fetch decks in api
    fetchDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(() => {
          this.setState({
            ready: true // update state
          })
      })
  }

  render() {
    const { ready } = this.state // get ready from state
    const { decks } = this.props // get decks from props

    // render item
    const renderItem = ({ item }) => (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => this.props.navigation.navigate( // navigate to deck
          'Deck',
          { key : item.name }
        )}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.cardCounter}>{`Cards: ${item.cards.length}`}</Text>
      </TouchableOpacity>
    )

    // if ready
    if (ready) {
      return (
          <SafeAreaView style={styles.container}>
            {/* Render flatlist component to render decks */}
            {decks.length === 0 ?
              <FlatList
                  data={Object.values(decks)}
                  renderItem={renderItem}
                  keyExtractor={item => item.name}
              />
              : 
                <View style={{flexDirection: 'row', flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{color: blue, textAlign: 'center', fontSize: 20}}>You don't have any decks yet...</Text>
                </View>
            }
          </SafeAreaView>
      )
    } else {
      return <View></View>
    }
  }
}

// component styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10
    },
    item: {
      borderColor: blue,
      borderWidth: 3,
      borderRadius: 15,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
      color: blue,
      textAlign: 'center'
    },
    cardCounter: {
      fontSize: 18,
      color: orange,
      textAlign: 'center'
    }
  });

/**
  * @description mapStateToProps function
  * @param {Object} from_store - Get data from store
  * @return {Object} decks - 
  */
function mapStateToProps(decks) {
    return {
        decks // return decks
    }
}

export default connect(mapStateToProps)(Decks)