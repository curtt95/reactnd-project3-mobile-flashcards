import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, gray, red, green, orange, lightgreen } from '../utils/colors'
import SubmitButton from './SubmitButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

/**
 * Quiz component
 */
class Quiz extends Component {
    state = { // initial state
        score: 0,
        questionNumber: 0,
        showAnswer: false
    }

    /**
     * @description code to run when the component mounts
     */
    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.deckname + " - Quiz" }) // update title in nav
    }

    /**
     * @description handling toggling between answer
     */
    toggleAnswer = () => {
        if (this.state.showAnswer) { 
            this.setState({
                showAnswer: false // update state - hide answer
            })
        } else {
            this.setState({
                showAnswer: true // update state - show answer
            })
        }
    }

    /**
     * @description handle correct answer
     */
    handleCorrect = () => {
        this.setState({
            score: this.state.score + 1, // update score 
            questionNumber: this.state.questionNumber + 1, // increment question number
            showAnswer: false // reset answer
        })
    }

    /**
     * @description handle incorrect answer
     */
    handleIncorrect = () => {
        this.setState({
            questionNumber: this.state.questionNumber + 1, // increment question number
            showAnswer: false // reset answer
        })
    }

    /**
     * @description handle restart quiz
     */
    restartQuiz = () => {
        this.setState({ // reset state
            score: 0,
            questionNumber: 0,
            showAnswer: false
        })
    }

    render() {
        const { score, questionNumber, showAnswer } = this.state // get state
        const { cards, deckname } = this.props // get cards from props

        // handle if no cards
        if (cards.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>There are no cards in this deck</Text>
                </View>
            )
        }

        // handle quiz complete
        if (questionNumber === cards.length) {
            clearLocalNotification().then(setLocalNotification); // handle notifications
            return (
                <View style={styles.container}>
                    {/* calculate score */}
                    <Text style={[styles.title, {padding: 30}]}>Score: {score > 0 ? Math.round((score / cards.length) * 100, 2) : 0}%</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 5}}>
                            {/* Render a submit button for back to deck */}
                            <SubmitButton onPress={() =>
                                this.props.navigation.navigate("Deck", { key: deckname })} 
                                text="Back to Deck" 
                                color={green}/>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            {/* Render a submit button for restarting a quiz */}
                            <SubmitButton onPress={this.restartQuiz} text="Restart Quiz" color={orange}/>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    {/* question number */}
                    <Text style={styles.title}>Question {questionNumber + 1}/{cards.length}</Text>
                    {/* score */}
                    <Text style={styles.question}>Score: {score}</Text>
                    {/* render questions remaining */}
                    <Text style={{color:gray, textAlign: 'center'}}>Questions Remaining: {cards.length - questionNumber}</Text>
                    <Text style={styles.questionDetails}>{cards[questionNumber].question}</Text>

                    {/* show or hide answer */}
                    {showAnswer && <Text style={styles.answerDetails}>{cards[questionNumber].answer}</Text>}

                    {/* render submit button to show/hide answer */}
                    <SubmitButton onPress={this.toggleAnswer} text={showAnswer ? "Hide Answer" : "Show Answer"} color={blue}/>

                </View>
                <View style={{padding: 20}}>
                    <Text style={styles.title}>Answer:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 5}}>
                            {/* render submit button to mark question correct */}
                            <SubmitButton onPress={this.handleCorrect} text="Correct" color={green}/>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            {/* render submit button to mark question incorrect */}
                            <SubmitButton onPress={this.handleIncorrect} text="Incorrect" color={red}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

// component styles
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

/**
  * @description mapStateToProps function
  * @param {Object} from_store - Get data from store
  * @param {Object} from_route - Get data from route
  * @return {Object} decks - 
  */
function mapStateToProps(decks, { route }) {
    const { key } = route.params // get key from route

    return {
        deckname: decks[key].name, // deck name
        cards: decks[key].cards // cards
    }
}

export default connect(mapStateToProps)(Quiz)