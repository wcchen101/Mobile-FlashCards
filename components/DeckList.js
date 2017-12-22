import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks, fetchDecksResult } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import IndividualDeck from './IndividualDeck'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import { commonStyles } from '../utils/helpers'

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
        <View style={commonStyles.container}>
          <View style={commonStyles.topTap}>
            <Text style={{fontWeight:'bold'}}>Decks</Text>
          </View>
          <View style={commonStyles.container}>
            {decks !== undefined && decks && (Object.keys(decks).map((key) => (
              <View key={key} style={commonStyles.deckView}>
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
  deckCardText: {
    color: 'grey',
    justifyContent: 'center',
    margin: 5,
  },
})

//ES6 way to do mapStateToProps
const mapStateToProps = decks => ({ decks })

export default connect(
  mapStateToProps,
  { receiveDecks }
)(DeckList)
