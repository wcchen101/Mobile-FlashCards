import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, black, dogerBlue } from '../utils/colors'
import { getDecks, fetchDecksResult } from '../utils/api'
import { receiveDecks } from '../actions/index'

class IndividualDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      cards: 0,
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { individualDeck } = navigation.state.params
    return {
      title: individualDeck
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('MyDecksStore:decks')
      .then((data) => this.setState({
        decks: JSON.parse(data)
      }))
  }
  componentDidMount() {
    const { dispatch } = this.props.navigation
    fetchDecksResult()
      .then((decks) => dispatch(this.props.receiveDecks(decks)))

    AsyncStorage.getItem('MyDecksStore:decks')
      .then((data) => this.setState({
        decks: JSON.parse(data)
      }))
  }

  render() {
    const { individualDeck } = this.props.navigation.state.params
    let totalQuiz = this.props.decks.decks[individualDeck]['questions'].length
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Deck Title: { individualDeck }</Text>
          <Text>Totol quiz: {totalQuiz}</Text>
        </View>
        <TouchableOpacity
           onPress={() => this.props.navigation.navigate(
           'AddCard',
           {AddCard: individualDeck}
           )}
           style={[styles.button, {backgroundColor: white}]}>
          <Text> Add New Questions </Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={() => this.props.navigation.navigate(
           'QuizView',
           {individualDeck: individualDeck}
           )}
           style={[styles.button, {backgroundColor: dogerBlue}]}>
          <Text> Start Quiz </Text>
        </TouchableOpacity>
      </ScrollView>
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
    margin: 10,
  },
  deckText: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  deckCardText: {
    color: 'grey',
    justifyContent: 'center',
    margin: 5,
  },
  deckView: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 5,
    borderRadius: 5,
  }
})
function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
  {receiveDecks},
)(IndividualDeck)
