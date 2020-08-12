import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { white, blue } from '../utils/colors'
import SubmitButton from './SubmitButton'

/**
 * Add a deck component
 */
class AddDeck extends Component {
    state = { // initial state
        name: ""
    }

    /**
     * @description handles submission of the form
     */
    submit = () => {
        const key = this.state.name // sets key to name
        const deck = { // create new deck object
            name: this.state.name,
            cards: []
        }

        // dispatch addDeck action
        this.props.dispatch(addDeck({
            [key]: deck
        }));

        this.setState(() => ({ // reset state
            name: ""
        }))

        submitDeck({ deck, key }) // submit deck in api

        this.props.navigation.navigate( // navigate to deck
            'Deck',
            { key : key }
        )
    }

    /**
     * @description handles the onchange for the text
     * @param String text - The new deck text
     */
    onChangeText = (text) => {
        this.setState({ // update state
            name: text
        })
    }

    render() {
        const { name } = this.state // get name from state

        return (
            <View style={styles.container}>
                <Text style={styles.item}>
                    Create Deck
                </Text>
                <View style={styles.inputContainer}>
                    {/* Text input for deck name */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.onChangeText(text)}
                        placeholder="Deck Name..."
                        value={name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {/* Submit the form by calling SubmitButton component */}
                    <SubmitButton onPress={this.submit} disabled={name === ""} color={blue} text="Add Deck"/>
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
        borderRadius: 10,
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
    item: {
        color: blue, 
        fontSize: 25,
        padding: 15
    },
    inputContainer: {
        padding: 10
    }
});

// TODO: check for existing deck

export default connect()(AddDeck)