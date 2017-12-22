import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity,
        AsyncStorage, Picker } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks, createCard,
        getQuiz, fetchDecksResult } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { postNewQuiz, postNewDeck, receiveDecks } from '../actions/index'
import { styles } from '../utils/helpers'
import { commonStyles } from '../utils/helpers'

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      questions: [] ,
      cardQuestion: 'Question',
      cardAnswer: 'yes',
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
      <View style={commonStyles.container}>
        <View style={{margin: 20, padding: 10}}>
          <Text style={commonStyles.textTitle}> Please Enter Your Question and Answer </Text>
        </View>
        <TextInput
          style={commonStyles.textInput}
          onChangeText={(text) => this.setState({cardQuestion: text})}
          value={this.state.cardQuestion}
        />
        <Picker
          selectedValue={this.state.cardAnswer}
          onValueChange={(itemValue, itemIndex) => this.setState({cardAnswer: itemValue})}>
          <Picker.Item label="Correct" value="yes" />
          <Picker.Item label="Incorrect" value="no" />
        </Picker>
        <TouchableOpacity
           onPress={this.createNewCard}
           style={commonStyles.button}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// ES6 ways to do mapStateToProps
const mapStateToProps = (quizSet, decks) => ({ quizSet, decks })

export default connect(
  mapStateToProps, { postNewQuiz, receiveDecks}
)(AddCard)
