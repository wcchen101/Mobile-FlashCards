import React, { Component } from 'react'
import FlipCard from 'react-native-flip-card'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, green, red } from '../utils/colors'
import { createDeckTitle, getDecks } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class QuizView extends Component {
  constructor(props) {
    super(props);
    const deck = [];
    this.state = {
      quizSet: null,
      correctQuiz: 0,
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
    AsyncStorage.getItem('MyDecksStore:decks')
      .then((data) => {
        data = JSON.parse(data)
        let deck = data[individualDeck]
        let questions = deck['questions']
        let answer = deck['questions']['answer']
        console.log('quiz set: ', deck)
        console.log('quiz length', questions.length)
        console.log('question', questions)
        console.log('answer', answer)
        this.setState({
          quizSet: deck,
          questions: deck['questions'],

        })

      });
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
  onPressAnwser = () => {

  }
  onPressCorrect = () => {
    //chekc with data and updated current correct
    console.log('correct')
  }
  onPressIncorrect = () => {
    //chekc with data and updated current correct
    console.log('incorrect')
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'CreateNewDeck'}))
  }
  render() {
    const { quizSet, correctQuiz } = this.state
    let questions = []
    if (quizSet) {
      questions = quizSet['questions']
    }
    console.log(questions)
    return (
      <View style={styles.container}>
        <View>
          <Text>{correctQuiz}/{questions.length}</Text>
        </View>

        {questions !== undefined && questions.length !== 0 && questions.map((item, index) => (
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
        ))}

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
  deckTop: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
    borderColor: 'yellow',
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 300,
    height: 50,
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
    margin: 15,
    padding: 10,
    justifyContent: 'center',
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
)(QuizView)
