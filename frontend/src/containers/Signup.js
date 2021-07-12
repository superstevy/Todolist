import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const usernameRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState({
    usersList: [],
    activeUser: {
      id: null,
      username: usernameRef,
      email: emailRef,
      password: passwordRef
    }
  })
  const history = useHistory()

  const getCookie = (cookieName) => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, cookieName.length + 1) === (cookieName + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(cookieName.length + 1))
          break
        }
      }
    }

    return cookieValue
  }

  const fetchUsers = () => {
    console.log('fetching users...')
    fetch('https://todos-list-backends.herokuapp.com/api/user-list/')
      .then(response => response.json())
      .then(data =>
        setUsers({
          usersList: data
        }))
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const url = 'https://todos-list-backends.herokuapp.com/api/register/'
    const csrftoken = getCookie('csrftoken')

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setUsers({
        ...users,
        activeUser: {
          id: null,
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }
      })
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(users.activeUser)
      }).then(response => {
        fetchUsers()
        setUsers({
          activeUser: {
            id: null,
            username: '',
            email: '',
            password: ''
          }
        })
      }).catch(error => {
        console.log('ERROR: ', error)
      })
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' ref={usernameRef} required />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-3' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  )
}
