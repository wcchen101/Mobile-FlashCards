import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'

export function createDeckTitle(deck) {
  let newDecks = [];
  AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {
      if (data != null) {
        newDecks = newDecks.concat(JSON.parse(data));
      }
      newDecks = newDecks.concat([deck]);
      AsyncStorage.setItem('MyDecksStore:decks', JSON.stringify(newDecks));
      console.log('done create new deck', newDecks);
    });

}
export function getDecks() {
  return AsyncStorage.getItem('MyDecksStore:decks')
    .then((data) => {console.log(data)});
}
