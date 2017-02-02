import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {}, commits: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  reposByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.REPOS_REQUEST,
      ActionTypes.REPOS_SUCCESS,
      ActionTypes.REPOS_FAILURE
    ]
  }),
  commitsByRepo: paginate({
    mapActionToKey: action => action.repo,
    types: [
      ActionTypes.COMMITS_REQUEST,
      ActionTypes.COMMITS_SUCCESS,
      ActionTypes.COMMITS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  routing
})

export default rootReducer
