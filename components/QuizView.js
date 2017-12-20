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
    const { dispatch } = this.props.navigation
    getQuiz(individualDeck)
      .then((quizSet) => {
        this.props.receiveQuizs(individualDeck, quizSet['questions'])
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
  render() {
    const { quizSet } = this.props
    let { individualDeck } = this.props.navigation.state.params
    console.log( this.props.navigation,'individual', individualDeck,'outside', this.props.quizSet)
    const { correctQuiz, currentQuizIndex } = this.state
    let questions = undefined
    if (individualDeck !== undefined && quizSet['decks']) {
      questions = quizSet['decks'][individualDeck]['questions']
    }
    if (quizSet == undefined || !quizSet || questions == undefined) {
      return <AppLoading/>
    }
    let correctPercentage = correctQuiz/questions.length * 100
    console.log('item', questions[currentQuizIndex], 'index', currentQuizIndex, 'q', questions)
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  textTitle: {
    fontSize: 25,
    justifyContent: 'center',

  },
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
  return {
    quizSet,
  }
}

export default connect(
  mapStateToProps,
  { receiveQuizs },
)(QuizView)
