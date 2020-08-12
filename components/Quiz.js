import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, gray, red, green, orange, lightgreen } from '../utils/colors'
import SubmitButton from './SubmitButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    state = {
        score: 0,
        questionNumber: 0,
        showAnswer: false
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.deckname + " - Quiz" })
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
            questionNumber: this.state.questionNumber + 1,
            showAnswer: false
        })
    }

    handleIncorrect = () => {
        this.setState({
            questionNumber: this.state.questionNumber + 1,
            showAnswer: false
        })
    }

    restartQuiz = () => {
        this.setState({
            score: 0,
            questionNumber: 0,
            showAnswer: false
        })
    }

    render() {
        const { score, questionNumber, showAnswer } = this.state
        const { cards, deckname } = this.props

        if (cards.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>There are no cards in this deck</Text>
                </View>
            )
        }

        if (questionNumber === cards.length) {
            clearLocalNotification().then(setLocalNotification);
            return (
                <View style={styles.container}>
                    <Text style={[styles.title, {padding: 30}]}>Score: {score > 0 ? Math.round((score / cards.length) * 100, 2) : 0}%</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 5}}>
                            <SubmitButton onPress={() =>
                                this.props.navigation.navigate("Deck", { key: deckname })} 
                                text="Back to Deck" 
                                color={green}/>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            <SubmitButton onPress={this.restartQuiz} text="Restart Quiz" color={orange}/>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.title}>Question {questionNumber + 1}/{cards.length}</Text>
                    <Text style={styles.question}>Score: {score}</Text>
                    <Text style={styles.questionDetails}>{cards[questionNumber].question}</Text>

                    {showAnswer && <Text style={styles.answerDetails}>{cards[questionNumber].answer}</Text>}

                    <SubmitButton onPress={this.toggleAnswer} text={showAnswer ? "Hide Answer" : "Show Answer"} color={blue}/>

                </View>
                <View style={{padding: 20}}>
                    <Text style={styles.title}>Answer:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 5}}>
                            <SubmitButton onPress={this.handleCorrect} text="Correct" color={green}/>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            <SubmitButton onPress={this.handleIncorrect} text="Incorrect" color={red}/>
                        </View>
                    </View>
                </View>
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
      textAlign: 'center',
      padding: 8
    },
    question: {
      fontSize: 25,
      textAlign: 'center',
      padding: 10
    },
    questionDetails: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10
    },
    answerDetails: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        color: green
    },
    questionContainer: {
        backgroundColor: lightgreen,
        borderRadius: 20,
        padding: 50,
        width: '95%'
    }
});

function mapStateToProps(decks, { route }) {
    const { key } = route.params

    return {
        deckname: decks[key].name,
        cards: decks[key].cards
    }
}

export default connect(mapStateToProps)(Quiz)