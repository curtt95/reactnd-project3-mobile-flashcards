import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

class Score extends Component {
    render() {
        return (
            <View>
                Score
            </View>
        )
    }
}

export default connect()(Score)