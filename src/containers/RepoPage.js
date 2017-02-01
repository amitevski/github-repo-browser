import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCommits } from '../actions'
import Repo from '../components/Repo'
import User from '../components/User'
import List from '../components/List'

const loadData = props => {
  const { login, repo } = props
  props.loadCommits(login, repo)
}

class RepoPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commitPagination: PropTypes.object,
    commits: PropTypes.array.isRequired,
    loadCommits: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.repo !== this.props.repo) {
      loadCommits(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    const {repo, login} = this.props;
    this.props.loadCommits(login, repo, true)
  }


  render() {
    const { repo } = this.props
    if (!repo || !commits) {
      return <h1><i>Loading {repo} commits...</i></h1>
    }

    const { commits, commitPagination } = this.props
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()
  const repo = ownProps.params.repo.toLowerCase()

  const {
    pagination: { commitsByRepo },
    entities: { commits }
  } = state

  const commitPagination = commitsByRepo[repo] || { ids: [] }
  // const commits = commitPagination.ids.map(id => commits[id])

  return {
    login,
    repo,
    commits,
    commitPagination
  }
}

export default connect(mapStateToProps, {
  loadCommits
})(RepoPage)
