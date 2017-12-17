import { combineReducers } from 'redux'
import { SET_DECKS, POST_NEW_DECK, POST_NEW_QUIZ, RECEIVE_DECKS, RECEIVE_QUIZS } from '../actions'

function decks(state = {}, action) {
  switch(action.type) {
    case POST_NEW_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    default:
      return state
  }
}
function quizSet(state=[], action) {
  console.log('reducer', action)
  const { quiz } = action
  switch(action.type) {
    case POST_NEW_QUIZ:
      return [
        ...state,
        ...action.quiz,
      ]
    case RECEIVE_QUIZS:
      console.log('quizset action', action.quizSet)
      return [
        ...state,
        ...action.quizSet,
      ]

    default:
      return state
    }
}

export default combineReducers({
  decks,
  quizSet,
})
