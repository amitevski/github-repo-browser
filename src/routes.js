import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'

export default <Route path="/" component={App}>
  <IndexRedirect to="/amitevski" />
  <Route path="/:login/:repo"
    component={RepoPage} />
  <Route path="/:login"
    component={UserPage} />
</Route>
