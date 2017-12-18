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
export function postNewQuiz(quiz) {
  return {
    type: 'POST_NEW_QUIZ',
    quiz,
  }
}
export function receiveQuizs(quizSet) {
  return {
    type: 'RECEIVE_QUIZS',
    quizSet,
  }
}
