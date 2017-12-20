import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks, createCard, getQuiz, fetchDecksResult } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { postNewQuiz, postNewDeck, receiveDecks } from '../actions/index'
import { styles } from '../utils/helpers'

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      questions: [] ,
      cardQuestion: 'Question',
      cardAnswer: 'Answer',
      cardCategory: null,
    };
  }
  componentDidMount() {
    const cardCategory = this.props.navigation.state.params.AddCard
    getQuiz(cardCategory)
      .then((quizSet) => this.setState({questions: quizSet['questions']}))
      .then(() => this.setState({
            cardCategory: cardCategory
        }))
    fetchDecksResult()
      .then((decks) => this.setState({
        decks: decks,
      }))

  }
  componentWillUnmount() {
    const cardCategory = this.props.navigation.state.params.AddCard
    const { dispatch } = this.props.navigation
    fetchDecksResult()
      .then((decks) => dispatch(this.props.receiveDecks(decks)))

  }
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Add Card'
    }
  }
  createNewCard = () => {
    const { dispatch, navigate, goBack } = this.props.navigation
    const { decks } = this.state
    let cardSet = {}
    let deck = this.state.cardCategory
    let resDeck = this.state.decks
    cardSet['question'] = this.state.cardQuestion
    cardSet['answer'] = this.state.cardAnswer
    let nextIndex = this.state.cardQuestion.length
    console.log('resDeck', resDeck)
    dispatch(this.props.postNewQuiz(
      decks,
      cardSet,
      deck,
    ))

    createCard(deck, cardSet)
    this.props.navigation.dispatch(NavigationActions.back({individualDeck: deck}))
  }
  getCurrentDecks = () => {
    getDecks();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { category } = this.props.navigation.state.params.AddCard
    return (
      <View style={styles.container}>
        <View style={{margin: 20, padding: 10}}>
          <Text style={styles.textTitle}> Please Enter Your Question and Answer </Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({cardQuestion: text})}
          value={this.state.cardQuestion}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({cardAnswer: text})}
          value={this.state.cardAnswer}
        />
        <TouchableOpacity
           onPress={this.createNewCard}
           style={styles.button}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(quizSet, decks) {
  console.log('ampe state to props', quizSet, decks)
  return {
    quizSet: quizSet,
    decks: decks,
  }
}

export default connect(
  mapStateToProps, { postNewQuiz, receiveDecks}
)(AddCard)
