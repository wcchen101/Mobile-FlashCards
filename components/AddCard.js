import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks, createCard } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { postNewQuiz } from '../actions/index'
import { styles } from '../utils/helpers'

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardQuestion: 'Question',
      cardAnswer: 'Answer',
      cardCategory: null,
    };
  }
  componentDidMount() {
    this.setState({
      cardCategory: this.props.navigation.state.params.AddCard
    })
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Add Card'
    }
  }
  createNewCard = () => {
    const { dispatch } = this.props.navigation
    console.log('props quiz', this.props)
    let cardSet = {}
    let deck = this.state.cardCategory

    console.log('deck here', deck)
    cardSet['question'] = this.state.cardQuestion
    cardSet['answer'] = this.state.cardAnswer
    let nextIndex = this.state.cardQuestion
    dispatch(this.props.postNewQuiz({
      [nextIndex]:cardSet,
    }))
    createCard(deck, cardSet)

    this.props.navigation.navigate('Home')

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

function mapStateToProps(quizSet) {
  return {
    quizSet
  }
}

export default connect(
  mapStateToProps, { postNewQuiz }
)(AddCard)
