import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { blue, white, orange, gray, red, green } from "../utils/colors";
import SubmitButton from "./SubmitButton";
import { removeDeck } from '../actions'
import { submitRemoveDeck } from '../utils/api'

/**
 * Deck component
 */
class Deck extends Component {
  /**
   * @description code to run when the component mounts
   */
  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name }) // set title in nav
  }

  /**
   * @description handling removing a deck
   */
  removeDeck = () => {
    const key = this.props.deck // get key
    const deck = { // create deck option
        name: key.name
    }

    this.props.dispatch(removeDeck(deck)) // dispatch removeDeck action

    submitRemoveDeck({ deck }) // call submit remove deck in api

    this.props.navigation.navigate('Home') // navigate back to home
  }

  render() {
    const { deck } = this.props // get deck from props

    if (deck === undefined) { // handle deck undefined
      return(
        <View></View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.name}</Text>
          {/* Card counter */}
          <Text style={styles.cardCounter}>{`Cards: ${deck.cards.length}`}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={{paddingRight: 5}}>
            {/* Submit button to start quiz */}
            <SubmitButton
              onPress={() =>
                this.props.navigation.navigate("Quiz", { key: deck.name })
              }
              text="Start Quiz"
              disabled={false}
              color={green}
            />
          </View>
          <View style={{paddingRight: 5}}>
            {/* Submit button to add a card */}
            <SubmitButton
              onPress={() =>
                this.props.navigation.navigate("AddCard", { key: deck.name })
              }
              text="Add Card"
              disabled={false}
              color={gray}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column', padding: 20}}>
          {/* Submit button to remove a deck */}
          <SubmitButton
              onPress={this.removeDeck}
              text="Remove Deck"
              disabled={false}
              color={red}
            />
        </View>
      </View>
    );
  }
}

// component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 7,
    justifyContent: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    color: blue,
    textAlign: "center",
    padding: 7
  },
  cardCounter: {
    fontSize: 25,
    color: orange,
    textAlign: "center",
    padding: 5
  },
  deleteBtn: {
    flexDirection: 'column',
    color: red, 
    fontSize: 18,
    padding: 20
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row'
  }
});

/**
  * @description mapStateToProps function
  * @param {Object} from_store - Get data from store
  * @param {Object} from_parent - Get props passed from parent
  * @return {Object} decks - 
  */
function mapStateToProps(decks, { route }) {
  const { key } = route.params // get key from route

  return {
    decks: decks, // decks
    deck: decks[key] // specific deck
  }
}

export default connect(mapStateToProps)(Deck);