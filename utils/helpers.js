import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'

export function createDeckTitle(deck) {
  let newDecks = {};
  console.log('deck title', deck['title'])
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      if (data !== undefined && data !== null) {
        newDecks = JSON.parse(data)
      } else {
        newDecks = {}
      }
      newDecks[deck['title']] = deck;
      AsyncStorage.setItem('MyDecksStore:decks', JSON.stringify(newDecks));
      console.log('done create new deck', newDecks);
    });
}
export function getDecks() {
  AsyncStorage.removeItem('MyDecksStore:decks')
  return AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {console.log(JSON.parse(data))});
}

export function createCard(deckTitle, card) {
  let newDecks = [];
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      data = JSON.parse(data)
      data[deckTitle]['questions'].push(card)
      AsyncStorage.setItem('MyDecksStore:decks', JSON.stringify(data));
      console.log('done create new card', data[deckTitle]['questions']);
    });
}
export function getQuiz(deck) {
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      data = JSON.parse(data)
      let deck = data[deck]
      let question = deck['question']
      let count = deck['question'].length
      let answer = deck['answer']
    });
}
