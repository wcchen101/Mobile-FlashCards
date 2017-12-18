import React, { Component } from 'react'
import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, green, red } from '../utils/colors'
import { createDeckTitle, getDecks, getQuiz } from '../utils/api'
import { NOTIFICATION_KEY, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import { receiveQuizs } from '../actions'
import { AppLoading } from 'expo'

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      correctQuiz: 0,
      currentQuizIndex: 0,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }
  componentDidMount() {
    const { individualDeck } = this.props.navigation.state.params
    console.log(individualDeck)
    getQuiz(individualDeck)
      .then((quizSet) => {this.props.receiveQuizs(quizSet['questions'])})

    getQuiz(individualDeck)
      .then((quizSet) => this.setState({questions: quizSet['questions']}))

    console.log('quiz set: ', this.state.quizSet)
  }
  checkQuizAnswer() {

  }
  createNewDeck = () => {
    createDeckTitle(this.state.text);
    this.toHome();
  }
  getCurrentDecks = () => {
    getDecks();
  }
  onCheckAnwser(answer) {
    let curIndex = this.state.currentQuizIndex
    let quizs = this.state.questions
    if (quizs[curIndex]['answer'] === answer) {
      console.log('yes')
      this.setState({
        correctQuiz: this.state.correctQuiz + 1,
        currentQuizIndex: this.state.currentQuizIndex + 1,
      })
    } else {
      console.log('no')
      this.setState({
        currentQuizIndex: this.state.currentQuizIndex + 1,
      })
    }
    if (quizs !== undefined && currentQuizIndex >= questions.length - 1) {
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
  render() {
    const { quizSet } = this.props.quizSet
    const { correctQuiz, currentQuizIndex } = this.state
    let questions = undefined
    if (quizSet) {
      questions = quizSet
    }
    if (quizSet == undefined || !quizSet || questions == undefined) {
      return <AppLoading/>
    }

    console.log('quiz', this.props)
    let correctPercentage = correctQuiz/questions.length * 100
    let item = questions[currentQuizIndex]
    return (
      <View style={styles.container}>
        { questions !== undefined && currentQuizIndex >= questions.length ? (
          <View>
            <Text>Congratulations! You complete the tests!</Text>
            <Text>Your scores {correctPercentage}%</Text>
          </View>
        )
          :
            (
              <View>
                <Text>Result {correctQuiz}/{questions.length}</Text>
                {questions !== undefined && questions.length !== 0 && (
                  <View key={item}>
                    <FlipCard
                      style={styles.card}
                      friction={6}
                      perspective={1000}
                      flipHorizontal={true}
                      flipVertical={false}
                      flip={false}
                      clickable={true}
                      onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                    >
                      {/* Face Side */}
                      <View >
                        <Text style={styles.textTitle}>{item['question']}</Text>
                      </View>
                      {/* Back Side */}
                      <View>
                        <Text style={styles.textTitle}>{item['answer']}</Text>
                      </View>
                    </FlipCard>
                    <TouchableOpacity
                       onPress={this.onPressCorrect}
                       style={[styles.button, {backgroundColor: green}]}>
                      <Text> Correct </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       onPress={this.onPressIncorrect}
                       style={[styles.button, {backgroundColor: red}]}>
                      <Text> Incorrect </Text>
                    </TouchableOpacity>
                    <Text>{this.state.text}</Text>
                  </View>
                )}
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 30,
    padding: 10,
    height: 200,
    width: 300,
    justifyContent: 'center',
  }
})

function mapStateToProps(quizSet) {
  console.log('mapstatetoprops', quizSet)
  return {
    quizSet,
  }
}

export default connect(
  mapStateToProps,
  { receiveQuizs },
)(QuizView)
