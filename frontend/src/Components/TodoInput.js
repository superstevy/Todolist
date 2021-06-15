import React, { useState } from 'react'
import { addTodo } from '../Redux/actions'
import { v1 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'

function TodoInput () {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  return (
    <div>
      <div className='row m-2'>
        <h1>Enter a task below!</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='col form-control'
          placeholder='Enter your task here'
        />
        <button
          onClick={() => {
            (name !== '') &&
            dispatch(addTodo(
              {
                id: uuid(),
                name: name
              }
            ))
            setName('')
          }}
          className='col btn btn-primary mx-2'
        >Add Task
        </button>
      </div>
    </div>
  )
}

export default TodoInput
