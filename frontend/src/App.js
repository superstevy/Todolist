import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import Signup from './containers/Signup'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login.js'
import PrivateRoute from './containers/PrivateRoute'
import ForgotPassword from './containers/ForgotPassword'
// import { AuthProvider } from './contexts/AuthContext'
import UpdateProfile from './containers/UpdateProfile'

function App () {
  return (
    <div className='container'>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </Router>
        </div>
      </Container>
    </div>
  )
}

export default App
