import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    loggedIn: localStorage.getItem('token') ? true : false,
    username: ''
  })
  const history = useHistory()
  const url = 'https://todos-list-backends.herokuapp.com/api/login/'

  useEffect(() => {
    if (user.loggedIn) {
      fetch(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => res.json())
        .then(json => {
          setUser({ username: json.username })
        })
    }
  })

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      fetch('https://todos-list-backends.herokuapp.com/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token)
          setUser({
            loggedIn: true,
            username: json.user.username
          })
        })
      history.push('/')
    } catch {
      setError('Failed to sign in')
    }

    setLoading(false)
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-3' type='submit'>
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  )
}
