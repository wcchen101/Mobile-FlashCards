import { combineReducers } from 'redux'
import { SET_DECKS, POST_NEW_DECK, ADD_QUIZ, RECEIVE_DECKS } from '../actions'

function decks(state = {}, action) {
  console.log('reducer', action)
  switch(action.type) {
    case SET_DECKS:
      let decks = []
      for (let i = 0; i < action.decks.length; i++) {
        decks.push(action.decks[i])
      }
      return decks
    case POST_NEW_DECK:
      return {
        ...state,
        ...action.decks,
      }
    case RECEIVE_DECKS:
      console.log('receive decks', action.decks)
      return {
        ...state,
        ...action.decks,
      }
    default:
      return state
  }
}
function quizs(state={}, action) {
  switch(action.type) {
    case ADD_QUIZ:
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
