import { combineReducers } from 'redux'
import { SET_DECKS, POST_NEW_DECK, POST_NEW_QUIZ, RECEIVE_DECKS, RECEIVE_QUIZS } from '../actions'
import update from 'immutability-helper';

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
function quizSet(state={}, action) {
  const { quiz, deck, decks} = action
  switch(action.type) {
    case POST_NEW_QUIZ:
      return update(decks[deck]['questions'],
            {$push: [quiz]}
      )
    case RECEIVE_QUIZS:
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: quiz,
        },
      }
    default:
      return state
    }
}

export default combineReducers({
  decks,
  quizSet,
})
