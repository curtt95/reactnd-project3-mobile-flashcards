import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { blue, white } from '../utils/colors'
import { addCard } from '../actions'
import { submitCard } from '../utils/api'
import SubmitButton from './SubmitButton'

/**
 * Add a card to a deck component
 */
class AddCard extends Component {
    state = { // initial state
        question: "",
        answer: ""
    }

    /**
     * @description code to run when the component mounts
     */
    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.deck.name + " - Add Card" }) // update title in nav
    }

    /**
     * @description handles the onchange for the question
     * @param String component - The new question text
     */
    onChangeQuestion = (ques) => {
        this.setState({
            question: ques // update state with question
        });
    }

    /**
     * @description handles the onchange for the answer
     * @param String ans - The new answer text
     */
    onChangeAnswer = (ans) => {
        this.setState({
            answer: ans // update state with answer
        });
    }

    /**
     * @description handles submission of the form
     */
    submit = () => {
        const { question, answer } = this.state // get from state
        const { deck } = this.props // get deck from props

        const card = { // create new card
            question: question,
            answer: answer
        }

        this.props.dispatch(addCard(deck, card)) // dispatch AddCard action

        this.setState(() => ({ // reset state
            question: "",
            answer: ""
        }))

        submitCard({ deck, card }) // call submitCard in api

        this.props.navigation.navigate('Deck') // navigate back to the deck
    }

    render() {
        const { question, answer } = this.state // grab question and answer from state

        return (
            <View style={styles.container}>
                <Text style={{color: blue, fontSize: 25, padding: 7}}>
                    Add Card
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 20, padding: 12, textAlign: 'center'}}>
                        What is your question?
                    </Text>
                    {/* Text input for question */}
                    <TextInput
                        id="question"
                        style={styles.input}
                        onChangeText={(text) => this.onChangeQuestion(text)}
                        placeholder="Question..."
                        value={question}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 20, padding: 12, textAlign: 'center'}}>
                        What is your answer?
                    </Text>
                    {/* Text input for answer */}
                    <TextInput
                        id="answer"
                        style={styles.input}
                        onChangeText={(text) => this.onChangeAnswer(text)}
                        placeholder="Answer..."
                        value={answer}
                    />
                </View>
                {/* Submit the form by calling SubmitButton component */}
                <SubmitButton onPress={this.submit} disabled={question === "" & answer === ""} color={blue} text="Add Card"/>
            </View>
        )
    }
}

// styles for this class
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
        borderRadius: 7,
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    },
    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        width: 350,
        fontSize: 20,
        padding: 10
    },
    inputContainer: {
        padding: 10
    }
});

/**
  * @description mapStateToProps function
  * @param {Object} from_store - Get data from store
  * @param {Object} from_parent - Get props passed from parent
  * @return {Object} decks - 
  */
function mapStateToProps(decks, { route }) {
    const { key } = route.params // get key from route params

    return {
        deck: decks[key] // return deck
    }
}

export default connect(mapStateToProps)(AddCard)