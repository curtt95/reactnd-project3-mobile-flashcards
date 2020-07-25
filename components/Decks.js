import React, { Component } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpcity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, orange } from '../utils/colors'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(() => {
          this.setState({
            ready: true
          })
      })
  }

    render() {
      const { ready } = this.state
      const { decks } = this.props

      const renderItem = ({ item }) => (
        <TouchableOpacity 
          style={styles.item}
          onPress={() => this.props.navigation.navigate(
            'Deck',
            { key : item.name }
          )}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.cardCounter}>{`Cards: ${item.cards.length}`}</Text>
        </TouchableOpacity>
      );

      if (ready) {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                />
            </SafeAreaView>
        )
      } else {
        return <View></View>
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    item: {
      backgroundColor: blue,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
      color: white,
      textAlign: 'center'
    },
    cardCounter: {
      fontSize: 18,
      color: orange,
      textAlign: 'center'
    },
  });

function mapStateToProps(decks) {
  console.log(decks)

    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)