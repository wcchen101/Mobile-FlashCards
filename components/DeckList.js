import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topTap}>
          <Text>Deck</Text>
        </View>
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
  topTap: {
    justifyContent: 'center',
    padding: 20,
    fontWeight: 'bold',
    borderColor: 'yellow',
    borderWidth: 2,
  }
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
