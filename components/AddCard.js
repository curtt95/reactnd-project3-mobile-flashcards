import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white } from '../utils/colors'
import { addCard } from '../actions'
import { submitCard } from '../utils/api'

function SubmitBtn({onPress, disabled}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    }

    onChangeQuestion = (ques) => {
        this.setState({
            question: ques
        });
    }

    onChangeAnswer = (ans) => {
        this.setState({
            answer: ans
        });
    }

    submit = () => {
        const { question, answer } = this.state
        const { deck } = this.props

        const card = {
            question: question,
            answer: answer
        }

        this.props.dispatch(addCard(deck, card))

        this.setState(() => ({
            question: "",
            answer: ""
        }))

        submitCard({ deck, card })
    }

    render() {
        const { question, answer } = this.state

        return (
            <View style={styles.container}>
                <Text style={{color: blue, fontSize: 25}}>
                    Add Card
                </Text>
                <TextInput
                    id="question"
                    style={styles.input}
                    onChangeText={(text) => this.onChangeQuestion(text)}
                    placeholder="Question..."
                    value={question}
                />
                <TextInput
                    id="answer"
                    style={styles.input}
                    onChangeText={(text) => this.onChangeAnswer(text)}
                    placeholder="Answer..."
                    value={answer}
                />
                <SubmitBtn onPress={this.submit} disabled={question === "" & answer === ""}/>
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
    }
});

function mapStateToProps(decks, { route }) {
    const { key } = route.params

    return {
        deck: decks[key]
    }
}

export default connect(mapStateToProps)(AddCard)