import React, { useState } from 'react'
import SignupForm from './SignupForm'
// import SignupFormSuccess from './SignupFormSuccess'
import TodoApi from './TodoApi'

function Form () {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false)

  const submitForm = () => {
    setFormIsSubmitted(true)
  }

  return (
    <div>
      {!formIsSubmitted
        ? <SignupForm submitForm={submitForm} />
        : <TodoApi />}
    </div>
  )
}

export default Form
