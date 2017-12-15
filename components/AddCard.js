import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks, createCard } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'


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
    let cardSet = {}
    let deck = this.state.cardCategory
    cardSet['question'] = this.state.cardQuestion
    cardSet['answer'] = this.state.cardAnswer
    console.log('card create', deck, cardSet)
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
        <Text>{this.state.cardQuestion}</Text>
        <Text>{this.state.cardAnswer}</Text>
        <Text>{this.state.cardCategory}</Text>
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

  }
})

function mapStateToProps(state, { navigation }) {
  return {

  }
}

export default connect(
  mapStateToProps,
)(AddCard)
