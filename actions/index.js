export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const POST_NEW_DECK = 'POST_NEW_DECK'
export const POST_NEW_QUIZ = 'POST_NEW_QUIZ'
export const SET_DECK = 'SET_DECK'
export const ADD_DECK = 'ADD_DECK'
export function receiveDecks(decks) {
  return {
    type: 'RECEIVE_DECKS',
    decks,
  }
}

export function postNewDeck(deck) {
  return {
    type: 'POST_NEW_DECK',
    deck,
  }
}
export function postNewQuiz(card) {
  return {
    type: 'POST_NEW_QUIZ',
    deck,
  }
}
