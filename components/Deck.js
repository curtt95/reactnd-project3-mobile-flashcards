import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { blue, white, orange, gray, red, green } from "../utils/colors";
import SubmitButton from "./SubmitButton";
import { removeDeck } from '../actions'
import { submitRemoveDeck } from '../utils/api'

class Deck extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name })
  }

  removeDeck = () => {
    const key = this.props.deck
    const deck = {
        name: key.name
    }

    this.props.dispatch(removeDeck(deck))

    submitRemoveDeck({ deck })

    this.props.navigation.navigate('Home')
  }

  render() {
    const { deck } = this.props

    if (deck === undefined) {
      return(
        <View></View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.name}</Text>
          <Text style={styles.cardCounter}>{`Cards: ${deck.cards.length}`}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={{paddingRight: 5}}>
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

function mapStateToProps(decks, { route }) {
  const { key } = route.params

  return {
    decks: decks,
    deck: decks[key]
  };
}

export default connect(mapStateToProps)(Deck);