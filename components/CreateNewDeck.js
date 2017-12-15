import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { addDeck, setDeck } from '../actions/index'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class CreateNewDeck extends Component {
  constructor(props) {
    super(props);
    const deck = [];
    this.state = { text: 'new deck' };
  }
  createNewDeck = () => {
    let deck = {};
    deck["title"] = this.state.text
    deck["questions"] = []
    console.log(this.props)
    this.props.dispatch(setDeck(deck))
    createDeckTitle({deck});
    console.log('createnew deck', deck)
    this.props.navigation.navigate('Home')
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
          <Text style={{fontWeight: 'bold'}}>New Deck Name </Text>
        </View>
        <View style={{margin: 20, padding: 10}}>
          <Text style={[styles.textTitle, {textAlign:'center'}]}> What is the title of your new deck? </Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={[styles.textInput]}
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
  subContainer: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  deckTop: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 2,
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

function mapStateToProps(state, props) {

  return {
  }
}

export default connect(
  mapStateToProps,
)(CreateNewDeck)
