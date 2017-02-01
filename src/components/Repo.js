import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ListItem, ListItemAction, ListItemContent, Icon } from 'react-mdl'

const Repo = ({ repo, owner }) => {
  const { login } = owner
  const { name, description } = repo

  return (
    <ListItem twoLine>
      <ListItemContent subtitle={description}>{name}</ListItemContent>
      <ListItemAction>
        <Link to={`/${login}/${name}`}><Icon name="exit_to_app" /></Link>
      </ListItemAction>
    </ListItem>
  )
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
}

export default Repo
