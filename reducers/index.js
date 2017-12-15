import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_NEW_DECK, ADD_QUIZ } from '../actions'

function decks(state = {}, action ) {
  console.log('reducer', action)
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_NEW_DECK:
      return [
              ...state,
              {
                deck: action.deck
              }
      ]

    default:
      return state
  }
}
function quizs(state={}, action) {
  switch(action.type) {
    case ADD_QUIZ:
      return state
    default:
      return state
    }
}

export default combineReducers({
  decks,
  quizs,
})
