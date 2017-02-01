import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {Card, CardActions, CardTitle} from 'react-mdl'

const User = ({ user }) => {
  const { login, avatarUrl, name, bio } = user
  console.log(avatarUrl)
  let userStyles = {width: '256px', height: '256px', background: 'url('+avatarUrl+') center / cover', margin: 'auto'}
  return (
    <Card shadow={0} style={userStyles}>
      <CardTitle expand />
      <CardActions style={{minHeight: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
          <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
            <span>{name}</span>
          </span>
      </CardActions>
    </Card>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
}

export default User
