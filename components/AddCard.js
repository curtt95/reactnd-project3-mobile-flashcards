import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    }

    render() {
        const { question, answer } = this.state

        return (
            <View style={styles.container}>
                <Text style={{color: blue, fontSize: 25}}>
                    Add Card
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.onChangeText(text)}
                    placeholder="Question..."
                    value={question}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.onChangeText(text)}
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

export default connect()(AddCard)