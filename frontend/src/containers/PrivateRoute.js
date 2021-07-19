import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
// import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute ({ component: Component, ...rest }) {
  // const { currentUser } = useAuth()

  const currentUser = async (username, email) => {
    const url = 'https://todos-list-backends.herokuapp.com/api/user-list/'

    await axios.get(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email
        })
      })
  }

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }}
    />
  )
}
