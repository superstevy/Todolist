import React, { useState } from 'react'
import { Card, Alert } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const history = useHistory()

  const success = async (text) => {
    console.log('Yeah! Authenticated')
    await window.localStorage.setItem('Token', text.access)
    window.location = '/'
  }
  async function handleSubmit (e) {
    e.preventDefault()

    const login = async (username, email, password, success, fail) => {
      const url = 'https://todos-list-backends.herokuapp.com/api/login/'
      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
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

    console.log('Loggin in with', username, email, password)

    try {
      setError('')
      setLoading(true)
      await login(username, email, password, success, (text) => { setMessage(text) })
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
          {error && <Alert variant='danger'>{error}</Alert>}
          <div style={{
            width: '100%',
            margin: 'auto',
            marginTop: '200px',
            boxShadow: '5px 5px 20px #cccccccc',
            padding: '1em'
          }}
          >
            <form>
              <div className='mb-3'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input
                  autoFocus type='text' className='form-control' id='username' placeholder='username'
                  onChange={(e) => { setUsername(e.target.value) }} value={username}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input
                  autoFocus type='email' className='form-control' id='email' placeholder='email'
                  onChange={(e) => { setEmail(e.target.value) }} value={email}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input
                  type='password' className='form-control' id='password' placeholder='password'
                  onChange={(e) => { setPassword(e.target.value) }} value={password}
                />
              </div>
              <div style={{ margin: '1em', color: 'red' }}>{message}</div>
              <button disabled={loading} type='submit' className='btn btn-primary w-100 mt-3' onClick={handleSubmit}>Login</button>
            </form>
          </div>
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
