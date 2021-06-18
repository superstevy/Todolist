import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { todos } from './Redux/states'

function ApiTodo () {
  const [tasks, setTasks] = useState([todos])
  const url = 'http://127.0.0.1:8000/todolist/task-list/'
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setTasks(res.data)
      })
  }, [tasks])
  return (
    <div id='list-wrapper'>
      {tasks.map((task, index) => {
        return (
          <div key={index} className='task-wrapper flex-wrapper'>

            <div style={{ flex: 7 }}>
              <span>{task.title}</span>
            </div>

            <div style={{ flex: 1 }}>
              <button className='btn btn-outline-info'>Edit</button>
            </div>

            <div style={{ flex: 1 }}>
              <button className='btn btn-outline-dark'>-</button>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default ApiTodo
