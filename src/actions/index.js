import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchUser(login))
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchRepo(fullName))
}


export const REPOS_REQUEST = 'REPOS_REQUEST'
export const REPOS_SUCCESS = 'REPOS_SUCCESS'
export const REPOS_FAILURE = 'REPOS_FAILURE'

// Fetches a page of repos owned by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepos = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [ REPOS_REQUEST, REPOS_SUCCESS, REPOS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadRepos = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/repos`,
    pageCount = 0
  } = getState().pagination.reposByUser[login] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchRepos(login, nextPageUrl))
}


export const COMMITS_REQUEST = 'COMMITS_REQUEST'
export const COMMITS_SUCCESS = 'COMMITS_SUCCESS'
export const COMMITS_FAILURE = 'COMMITS_FAILURE'

// Fetches commits for a specific repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchCommits = (repo, nextPageUrl) => ({
  repo,
  [CALL_API]: {
    types: [ COMMITS_REQUEST, COMMITS_SUCCESS, COMMITS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.COMMIT_ARRAY
  }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadCommits = (login, repo, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${login}/${repo}/commits`,
    pageCount = 0
  } = getState().pagination.commitsByRepo[repo] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchCommits(repo, nextPageUrl))
}



