import React, { PropTypes } from 'react'
import { ListItem, ListItemAction, ListItemContent, Icon } from 'react-mdl'

const Commit = ({ commit, url, sha }) => {
  const { message, author } = commit

  return (
    <ListItem twoLine>
      <ListItemContent subtitle={`${message} (${sha.slice(0,7)})`}>{author.name}</ListItemContent>
      <ListItemAction>
        <a href={url} target="_blank"><Icon name="code" /></a>
      </ListItemAction>
    </ListItem>
  )
}

Commit.propTypes = {
  commit: PropTypes.shape({
    message: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired
  }).isRequired,
  sha: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default Commit
