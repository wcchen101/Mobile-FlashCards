export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const POST_NEW_DECK = 'POST_NEW_DECK'
export const POST_NEW_QUIZ = 'POST_NEW_QUIZ'
export const RECEIVE_QUIZS = 'RECEIVE_QUIZS'

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
export function postNewQuiz(decks, quiz, deck) {
  return {
    type: 'POST_NEW_QUIZ',
    decks,
    quiz,
    deck,
  }
}
export function receiveQuizs(deck, quiz) {
  return {
    type: 'RECEIVE_QUIZS',
    quiz,
    deck,
  }
}
