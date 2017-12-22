import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, black, dogerBlue } from '../utils/colors'
import { getDecks, fetchDecksResult } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { commonStyles } from '../utils/helpers'

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
        <View style={commonStyles.container}>
          <Text>Deck Title: { individualDeck }</Text>
          <Text>Totol quiz: {totalQuiz}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
             onPress={() => this.props.navigation.navigate(
             'AddCard',
             {AddCard: individualDeck}
             )}
             style={[commonStyles.button, {backgroundColor: white}]}>
            <Text> Add New Questions </Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => this.props.navigation.navigate(
             'QuizView',
             {individualDeck: individualDeck}
             )}
             style={[commonStyles.button, {backgroundColor: dogerBlue}]}>
            <Text> Start Quiz </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
})

const mapStateToProps = decks => ({ decks })

export default connect(
  mapStateToProps,
  {receiveDecks},
)(IndividualDeck)
