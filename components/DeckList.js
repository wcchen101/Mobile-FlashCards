import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

class DeckList extends Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>Entry Detail </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps(state, { navigation }) {

  return {

  }
}

function mapDispatchToProps(dispatch, { navigation }) {

  return {

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckList)
