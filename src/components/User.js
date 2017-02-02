import React, { PropTypes } from 'react'
import {Card, CardActions, CardTitle} from 'react-mdl'

const User = ({ user }) => {
  const { avatarUrl, name } = user
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
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
}

export default User
