import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import IndividualDeck from './IndividualDeck'
class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  componentDidMount() {
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
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topTap}>
            <Text>Decks</Text>
          </View>
          <View style={styles.container}>
            {decks !== undefined && decks && (decks.map((deck, index) => (
              <View style={styles.deckView}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                  'IndividualDeck',
                  {individualDeck: deck}
                  )}
                >
                <Text style={styles.deckText} key={deck}> {deck} </Text>
                <Text style={styles.deckCardText}>0 cards</Text>
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
    borderColor: 'yellow',
    borderWidth: 2,
    margin: 10,
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
)(DeckList)
