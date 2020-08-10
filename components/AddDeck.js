import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { white, blue } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function SubmitBtn({onPress, disabled}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component {
    state = {
        name: ""
    }

    submit = () => {
        const key = this.state.name
        const deck = {
            name: this.state.name,
            cards: []
        }

        this.props.dispatch(addDeck({
            [key]: deck
        }));

        this.setState(() => ({
            name: ""
        }))

        submitDeck({ deck, key })

        clearLocalNotification()
            .then(setLocalNotification)
    }

    onChangeText = (text) => {
        this.setState({
            name: text
        })
    }

    render() {
        const { name } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.item}>
                    Create Deck
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.onChangeText(text)}
                        placeholder="Deck Name..."
                        value={name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <SubmitBtn onPress={this.submit} disabled={name === ""}/>
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

export default connect()(AddDeck)