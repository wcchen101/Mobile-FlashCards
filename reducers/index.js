import { combineReducers } from 'redux'
import { SET_DECKS, POST_NEW_DECK, ADD_QUIZ } from '../actions'

function decks(state = {}, action ) {
  console.log('reducer', action)

  switch(action.type) {
    case SET_DECKS:
      let decks = []
      for (let i = 0; i < action.decks.length; i++) {
        decks.push(action.decks[i])
      }
      return decks
    case POST_NEW_DECK:
      return [
              ...state,
              {
                deck: action.deck,
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
