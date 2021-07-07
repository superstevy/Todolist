import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import Signup from './Containers/Signup.js'
import Dashboard from './Containers/Dashboard'
import Login from './Containers/Login.js'
import PrivateRoute from './Containers/PrivateRoute'
import ForgotPassword from './Containers/ForgotPassword'
import { AuthProvider } from './contexts/AuthContext'
import UpdateProfile from './Containers/UpdateProfile'

function App () {
  return (
    <div className='container'>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute path='/update-profile' component={UpdateProfile} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  )
}

export default App
