import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import IndividualDeck from './IndividualDeck'
import { addDeck, setDeck } from '../actions'

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  componentDidMount() {
    console.log('adddeck', this.props)

    AsyncStorage.getItem('MyDecksStore:decks')
      .then((data) => this.setState({
        decks: JSON.parse(data)
      }))

  }
  checkIndividualDeck = () => {
    this.toIndividualDeck();
  }
  toIndividualDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))

  }
  render() {
    const { decks } = this.state
    console.log('type',typeof decks, decks)
    console.log('deck props', this.props)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topTap}>
            <Text style={{fontWeight:'bold'}}>Decks</Text>
          </View>
          <View style={styles.container}>
            {decks !== undefined && decks && (Object.keys(decks).map((key) => (
              <View key={key} style={styles.deckView}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                  'IndividualDeck',
                  {individualDeck: key}
                  )}
                >
                  <Text style={styles.deckCardText}>{key}</Text>
                  <Text style={styles.deckCardText}>{decks[key].questions.length} cards</Text>
                </TouchableOpacity>
              </View>
            )))}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  topTap: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 2,
  },
  deckText: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  deckCardText: {
    color: 'grey',
    justifyContent: 'center',
    margin: 5,
  },
  deckView: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 5,
    borderRadius: 5,
  }
})

function mapStateToProps(state, { navigation }) {
  console.log('state decks', state.decks)
  return {
    decks: state.decks,
  }
}

export default connect(
  mapStateToProps,
  { addDeck }
)(DeckList)
