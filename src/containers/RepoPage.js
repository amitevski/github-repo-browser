import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCommits } from '../actions'
import Commit from '../components/Commit'
import List from '../components/List'
import { Grid, Cell } from 'react-mdl'

const loadData = props => {
  const { login, repo } = props
  props.loadCommits(login, repo)
}

class RepoPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commitPagination: PropTypes.object,
    commits: PropTypes.object,
    currentCommits: PropTypes.array.isRequired,
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

  renderCommit(commit) {
    return (
      <Commit
        commit={commit.commit}
        sha={commit.sha}
        url={commit.htmlUrl}
        key={commit.sha} />
    )
  }


  render() {
    const { repo, currentCommits, login } = this.props
    if (!repo || !currentCommits) {
      return <h1 className="mdl-typography--headline"><i>Loading {repo} commits...</i></h1>
    }

    const { commitPagination } = this.props
    return (
      <Grid className="page-content">
        <Cell col={4}>
          <h1 className="mdl-typography--headline">Commits for repo <a target="_blank" href={`https://github.com/${login}/${repo}`}>{login}/{repo}</a></h1>
        </Cell>
        <Cell col={8}>
          <List renderItem={this.renderCommit}
            items={currentCommits}
            onLoadMoreClick={this.handleLoadMoreClick}
            loadingLabel={`Loading ${repo}'s commits...`}
            {...commitPagination} />
        </Cell>

      </Grid>
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
  const currentCommits = commitPagination.ids.map(id => commits[id])

  return {
    login,
    repo,
    commits,
    currentCommits,
    commitPagination
  }
}

export default connect(mapStateToProps, {
  loadCommits
})(RepoPage)
