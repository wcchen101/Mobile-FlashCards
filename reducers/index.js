import { combineReducers } from 'redux'
import { SET_DECKS, POST_NEW_DECK, POST_NEW_QUIZ, RECEIVE_DECKS } from '../actions'

function decks(state = {}, action) {
  console.log('type', action.type)
  switch(action.type) {
    case POST_NEW_DECK:
      console.log('POST_NEW_DECK')
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
function quizs(state={}, action) {
  console.log('reducer', action)
  switch(action.type) {
    case POST_NEW_QUIZ:
      return {
        ...state,
        ...action.quizs
      }
    default:
      return state
    }
}

export default combineReducers({
  decks,
  quizs,
})
