import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks, fetchDecksResult } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import IndividualDeck from './IndividualDeck'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props.navigation
    fetchDecksResult()
      .then((decks) => dispatch(this.props.receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  checkIndividualDeck = () => {
    this.toIndividualDeck();
  }
  toIndividualDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))
  }
  render() {
    let { decks } = this.props.decks
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading/>
    }
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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
  { receiveDecks }
)(DeckList)
