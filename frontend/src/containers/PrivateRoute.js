import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute ({ component: Component, ...rest }) {
  // const { currentUser } = useAuth()

  const currentUser = async (id, username, email, success, fail) => {
    const url = 'https://todos-list-backends.herokuapp.com/api/user-list/'

    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          username: username,
          email: email
        })
      })
    const text = await response.text()
    if (response.status === 200) {
      console.log('Success', JSON.parse(text))
      success(JSON.parse(text))
    } else {
      console.log('Failed', text)
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`)
      })
    }
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
