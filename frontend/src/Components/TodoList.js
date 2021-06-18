import React from 'react'
import TodoItem from './TodoItem'
// import TodoStatus from './TodoStatus'
import { useSelector } from 'react-redux'

function TodoList () {
  const todos = useSelector(state => state)

  return (
    <div id='list-wrapper'>
      <h3>List of tasks:</h3>
      {todos.map(todo => {
        return (
          <div key={todo.id} className='task-wrapper flex-wrapper'>
            <TodoItem key={todo.id} todo={todo} />
          </div>
        )
      })}
    </div>
  )
}

export default TodoList
