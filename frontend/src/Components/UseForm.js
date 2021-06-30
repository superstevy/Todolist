import { useState, useEffect } from 'react'
import Validation from './Validation'

const UseForm = (submitForm) => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [dataIsCorrect, setDataIsCorrect] = useState(false)

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setErrors(Validation(values))
    setDataIsCorrect(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true)
    }
  }, [dataIsCorrect, errors, submitForm])

  return { handleChange, handleFormSubmit, values, errors }
}

export default UseForm
