import React from 'react'
import './App.css'
import TodoInput from './Components/TodoInput'
import TodoList from './Components/TodoList'
import 'bootstrap/dist/css/bootstrap.css'
import ApiTodo from './ApiTodo'

function App () {
  return (
    <div className='container'>
      <TodoInput />
      <TodoList />
      <ApiTodo />
    </div>
  )
}

export default App
