import React, { Component } from 'react'
import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, green, red } from '../utils/colors'
import { createDeckTitle, getDecks, getQuiz } from '../utils/api'
import { NOTIFICATION_KEY, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import { receiveQuizs } from '../actions'
import { AppLoading } from 'expo'
import { commonStyles } from '../utils/helpers'

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      correctQuiz: 0,
      currentQuizIndex: 0,
      isShowAnswer: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }
  componentDidMount() {
    const { individualDeck } = this.props.navigation.state.params
    const { dispatch } = this.props.navigation

    getQuiz(individualDeck)
      .then((quizSet) => {
        dispatch(this.props.receiveQuizs(individualDeck, quizSet['questions']))
      })
    getQuiz(individualDeck)
      .then((quizSet) => this.setState({questions: quizSet['questions']}))
  }
  onCheckAnwser(answer) {
    let curIndex = this.state.currentQuizIndex
    let quizs = this.state.questions
    if (quizs[curIndex]['answer'] === answer) {
      this.setState({
        correctQuiz: this.state.correctQuiz + 1,
        currentQuizIndex: this.state.currentQuizIndex + 1,
      })
    } else {
      this.setState({
        currentQuizIndex: this.state.currentQuizIndex + 1,
      })
    }
    if (quizs !== undefined && curIndex >= quizs.length - 1) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }
  onPressIncorrect = () => {
    this.onCheckAnwser('no')
  }
  onPressCorrect = () => {
    this.onCheckAnwser('yes')
  }
  onFlipAnswer = () => {
    const { isShowAnswer } = this.state
    this.setState({
      isShowAnswer: !isShowAnswer,
    })
  }
  onPressRestartQuiz = () => {
    this.setState({
      correctQuiz: 0,
      currentQuizIndex: 0,
      isShowAnswer: false,
    })
  }
  onPressGoBackToDeck = () => {
    const { individualDeck } = this.props.navigation.state.params
    this.setState({
      questions: [],
      correctQuiz: 0,
      currentQuizIndex: 0,
      showAnswer: false,
    })
    this.props.navigation.dispatch(NavigationActions.back({individualDeck: individualDeck}))
  }
  render() {
    const { quizSet } = this.props
    const { individualDeck } = this.props.navigation.state.params
    const { correctQuiz, currentQuizIndex, isShowAnswer} = this.state
    let questions = undefined

    if (individualDeck !== undefined && quizSet['decks']) {
      questions = quizSet['decks'][individualDeck]['questions']
    }
    if (quizSet == undefined || !quizSet || questions == undefined) {
      return <AppLoading/>
    }

    let correctPercentage = correctQuiz/questions.length * 100
    let item = questions[currentQuizIndex]

    return (
      <View style={commonStyles.container}>
        { questions !== undefined && currentQuizIndex >= questions.length ? (
          <View>
            <Text>Congratulations! You complete the tests!</Text>
            <Text>Your scores {correctPercentage}%</Text>
            <TouchableOpacity
               onPress={this.onPressRestartQuiz}
               style={[commonStyles.button]}>
              <Text> Restart Quiz </Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={this.onPressGoBackToDeck}
               style={[commonStyles.button, {backgroundColor: green}]}>
              <Text> Go Back To deck </Text>
            </TouchableOpacity>
          </View>
        )
          :
            (
              <View>
                <Text>Quiz Left: {currentQuizIndex}/{questions.length}</Text>
                {questions !== undefined && questions.length !== 0 && (
                  <View key={item}>
                      {isShowAnswer === true ? (
                        <View>
                          <Text style={commonStyles.textTitle}>{item['answer']}</Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={commonStyles.textTitle}>{item['question']}</Text>
                        </View>
                      ) }
                    <TouchableOpacity
                       onPress={this.onFlipAnswer}
                       style={[commonStyles.button]}>
                      <Text> Show Answer </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       onPress={this.onPressCorrect}
                       style={[commonStyles.button, {backgroundColor: green}]}>
                      <Text> Correct </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       onPress={this.onPressIncorrect}
                       style={[commonStyles.button, {backgroundColor: red}]}>
                      <Text> Incorrect </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
        }
      </View>
    )
  }
}

const mapStateToProps = quizSet => ({ quizSet })

export default connect(
  mapStateToProps,
  { receiveQuizs },
)(QuizView)
