import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, gray } from '../utils/colors'
import SubmitButton from './SubmitButton'

class Quiz extends Component {
    state = {
        score: 0,
        questionNumber: 0
    }

    render() {
        const { score, questionNumber } = this.state
        const { cards } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Quiz</Text>
                <Text style={styles.question}>Score: {score}</Text>
                <Text style={styles.question}>Number: {questionNumber}</Text>
                <Text>{cards[questionNumber].question}</Text>
                <SubmitButton onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { key : deck.name }
                    )} text="Start Quiz" disabled={false} color={orange}/>
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
    question: {
      fontSize: 18,
      color: gray,
      textAlign: 'center'
    },
});

function mapStateToProps(decks, { route }) {
    const { key } = route.params

    console.log("cards")
    console.log(decks[key].cards)

    return {
        cards: decks[key].cards
    }
}

export default connect(mapStateToProps)(Quiz)