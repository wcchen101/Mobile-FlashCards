import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks } from '../utils/helpers'

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('MyDecksStore:decks')
      .then((data) => this.setState({
        decks: data
      }))
      .then((res) => console.log(this.state.decks));
  }
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
