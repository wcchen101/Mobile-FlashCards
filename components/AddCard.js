import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
  constructor(props) {
    super(props);
    const deck = [];
    this.state = { text: 'Deck Title' };
  }
  createNewDeck = () => {
    createDeckTitle(this.state.text);
    this.toHome();
  }
  getCurrentDecks = () => {
    getDecks();
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'CreateNewDeck'}))
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deckTop}>
          <Text>New Deck Name: </Text>
        </View>
        <View style={{margin: 20, padding: 10}}>
          <Text style={styles.textTitle}> What is the title of your new deck? </Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <TouchableOpacity
           onPress={this.createNewDeck}
           style={styles.button}>
          <Text> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={this.getCurrentDecks}
           style={styles.button}>
          <Text> Submit </Text>
        </TouchableOpacity>
        <Text>{this.state.text}</Text>
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
)(AddCard)
