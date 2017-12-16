export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const POST_NEW_DECK = 'POST_NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SET_DECK = 'SET_DECK'

export function receiveDecks(decks) {
  return {
    type: 'RECEIVE_DECKS',
    decks: getDecks,

  }
}


export function addDeck() {
  console.log('dispatch add deck')
  return (
    AsyncStorage.getItem('MyDecksStore:decks')
      .then(res => JSON.parse(res))
      .then(data => dispatch(setDeck(data)))
)
}
export function setDeck(deck) {
  return {
    type: 'SET_DECK',
    deck,
  }
}
export function postNewDeck(deck) {
  return {
    type: 'POST_NEW_DECK',
    deck,
  }
}
export function addCard(card) {
  return {
    type: 'ADD_CARD',
    deck,
  }
}
