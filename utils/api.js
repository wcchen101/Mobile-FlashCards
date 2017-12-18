import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'

export function fetchDecksResult() {
  return AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => JSON.parse(data))
}
export function createDeckTitle({deck}) {
  let newDecks = {};
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      if (data !== undefined && data !== null) {
        newDecks = JSON.parse(data)
      } else {
        newDecks = {}
      }
      newDecks[deck['title']] = deck;
      AsyncStorage.setItem('MyDecksStore:decks', JSON.stringify(newDecks));
    });
}
export function getDecks() {
  //remove in the future
  AsyncStorage.removeItem('MyDecksStore:decks')
  return AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {console.log(JSON.parse(data))});
}
export function createCard(deckTitle, card) {
  let newDecks = [];
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      data = JSON.parse(data)
      console.log('herer',data)
      data[deckTitle]['questions'].push(card)
      AsyncStorage.setItem('MyDecksStore:decks', JSON.stringify(data));
      console.log('done create new card', data[deckTitle]['questions']);
    });
}

export function getQuiz(individualDeck) {
  return AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      data = JSON.parse(data)
      let deck = data[individualDeck]
      let questions = deck['questions']
      let answer = deck['questions']['answer']
      return deck
    })

}
