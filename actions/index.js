export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SET_DECK = 'SET_DECK'
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks: getDecks
  }
}

export function addDeck() {
  console.log('dispatch add deck')
  return dispatch => {
    AsyncStorage.getItem('MyDecksStore:decks')
      .then(res => JSON.parse(res))
      .then(data => dispatch(setDeck(data)))
  }
}
export function setDeck(deck) {
  return {
    type: SET_DECK,
    deck,
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    deck,
  }
}
