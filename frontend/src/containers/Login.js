import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useHistory()

  const success = async (text) => {
    console.log('Yeah! Authenticated')
    await window.localStorage.setItem('salesToken', text.access)
    window.location = '/'
  }
  async function handleSubmit (e) {
    e.preventDefault()

    const login = async (username, email, password, success, fail) => {}
    console.log('Loggin in with', username, email, password)

    try {
      setError('')
      setLoading(true)
      await login(username, email, password, success)
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
