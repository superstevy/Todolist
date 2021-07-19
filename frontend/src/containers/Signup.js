import React, { useState } from 'react'
import { Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const history = useHistory()

  const success = (text) => {
    console.log('Yeah! Authenticated')
    window.localStorage.setItem('Token', text.access)
    // history.push('/')
    // window.location = '/'
  }

  async function handleSubmit (e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }

    const signup = async (username, email, password, success, fail) => {
      const url = 'https://todos-list-backends.herokuapp.com/api/register/'

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

    try {
      setError('')
      setLoading(true)
      await signup(username, email, password, success, (text) => { setMessage(text) })
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
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Confirm Password</label>
              <input
                type='password' className='form-control' id='passwordConfirm' placeholder='re-enter password'
                onChange={(e) => { setPasswordConfirm(e.target.value) }} value={passwordConfirm}
              />
            </div>
            <div style={{ margin: '1em', color: 'red' }}>{message}</div>
            <button disabled={loading} type='submit' className='btn btn-primary w-100 text-center mt-3' onClick={handleSubmit}>Sign Up</button>
          </form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  )
}
