import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, gray, red, green } from '../utils/colors'
import SubmitButton from './SubmitButton'

class Quiz extends Component {
    state = {
        score: 0,
        questionNumber: 0,
        showAnswer: false
    }

    toggleAnswer = () => {
        if (this.state.showAnswer) {
            this.setState({
                showAnswer: false
            })
        } else {
            this.setState({
                showAnswer: true
            })
        }
    }

    handleCorrect = () => {
        this.setState({
            score: this.state.score + 1,
            questionNumber: this.state.questionNumber + 1
        })
    }

    handleIncorrect = () => {
        this.setState({
            questionNumber: this.state.questionNumber + 1
        })
    }

    render() {
        const { score, questionNumber, showAnswer } = this.state
        const { cards } = this.props

        if (questionNumber === cards.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Score: {score > 0 ? Math.round((score / cards.length) * 100, 2) : 0}%</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Question {questionNumber + 1}</Text>
                <Text style={styles.question}>Score: {score}</Text>
                <Text>{cards[questionNumber].question}</Text>

                {showAnswer && <Text>{cards[questionNumber].answer}</Text>}

                <SubmitButton onPress={this.toggleAnswer} text={showAnswer ? "Hide Answer" : "Show Answer"} color={blue}/>

                <Text style={styles.title}>Answer:</Text>
                <SubmitButton onPress={this.handleCorrect} text="Correct" color={green}/>
                <SubmitButton onPress={this.handleIncorrect} text="Incorrect" color={red}/>
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

    return {
        cards: decks[key].cards
    }
}

export default connect(mapStateToProps)(Quiz)