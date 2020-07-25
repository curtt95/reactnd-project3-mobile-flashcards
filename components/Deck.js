import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, orange, gray } from '../utils/colors'

function Btn({onPress, text, disabled, color}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, {backgroundColor: color}]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>{text}</Text>
        </TouchableOpacity>
    )
}

class Deck extends Component {
    render() {
        const { deck } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{deck.name}</Text>
                <Text style={styles.cardCounter}>{`Cards: ${deck.cards.length}`}</Text>
                <Btn onPress={() => console.log("yes")} text="Start Quiz" disabled={false} color={orange}/>
                <Btn onPress={() => console.log("yes")} text="Add Card" disabled={false} color={gray}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    title: {
      fontSize: 32,
      color: blue,
      textAlign: 'center'
    },
    cardCounter: {
      fontSize: 18,
      color: gray,
      textAlign: 'center'
    },
});

function mapStateToProps(decks, { route }) {
    const { key } = route.params

    return {
        deck: decks[key]
    }
}

export default connect(mapStateToProps)(Deck)