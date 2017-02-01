import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadRepos } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'
import zip from 'lodash/zip'
import {Grid, Cell} from 'react-mdl'

const loadData = ({ login, loadUser, loadRepos }) => {
  loadUser(login, [ 'name' ])
  loadRepos(login)
}

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    reposPagination: PropTypes.object,
    allRepos: PropTypes.array.isRequired,
    allReposOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadRepos: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadRepos(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadRepos(this.props.login, true)
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  render() {
    const { user, login } = this.props
    if (!user) {
      return <h1><i>Loading {login}{"'s profile..."}</i></h1>
    }

    const { allRepos, allReposOwners, reposPagination } = this.props
    return (
      <Grid className="page-content">
          <Cell col={4}><User user={user} /></Cell>
          <Cell col={8}>
            <List renderItem={this.renderRepo}
            items={zip(allRepos, allReposOwners)}
            onLoadMoreClick={this.handleLoadMoreClick}
            loadingLabel={`Loading ${login}'s repos...`}
            {...reposPagination} />
          </Cell>
          
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()

  const {
    pagination: { reposByUser },
    entities: { users, repos }
  } = state

  const reposPagination = reposByUser[login] || { ids: [] }
  const allRepos = reposPagination.ids.map(id => repos[id])
  const allReposOwners = allRepos.map(repo => users[repo.owner])

  return {
    login,
    allRepos,
    allReposOwners,
    reposPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadRepos
})(UserPage)
