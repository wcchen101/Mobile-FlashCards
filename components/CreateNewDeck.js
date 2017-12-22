import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { addDeck, setDeck, postNewDeck } from '../actions/index'
import { purple, white } from '../utils/colors'
import { createDeckTitle, getDecks } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { commonStyles } from '../utils/helpers'

class CreateNewDeck extends Component {
  constructor(props) {
    super(props);
    const deck = [];
    this.state = { text: 'new deck' };
  }
  createNewDeck = () => {
    const { dispatch } = this.props.navigation
    let deck = {};
    let key = this.state.text
    deck["title"] = this.state.text
    deck["questions"] = []
    dispatch(this.props.postNewDeck({
      [key]: deck,
    }))
    createDeckTitle({deck})
    this.props.navigation.navigate(
    'IndividualDeck',
    {individualDeck: deck["title"]}
    )
    this.setState({
      text: 'new deck',
    })
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.topTap}>
          <Text style={{fontWeight: 'bold'}}>New Deck Name </Text>
        </View>
        <View style={{margin: 20, padding: 10}}>
          <Text style={[commonStyles.textTitle, {textAlign:'center'}]}> What is the title of your new deck? </Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={[commonStyles.textInput]}
            onChangeText={(text) => this.setState({text: text})}
            value={this.state.text}
          />
          <TouchableOpacity
             onPress={this.createNewDeck}
             style={commonStyles.button}>
            <Text> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

export default connect(
  null , { postNewDeck }
)(CreateNewDeck)
