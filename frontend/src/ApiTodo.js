import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { todos } from './Redux/states'

function ApiTodo ({ task }) {
  const [tasks, setTasks] = useState([{
    title: '',
    completed: false
  }])

  const urlList = 'http://127.0.0.1:8000/todolist/task-list/'
  const urlCreate = 'http://127.0.0.1:8000/todolist/task-create/'

  function fetchTask () {
    axios.get(urlList)
      .then(res => {
        setTasks(res.data)
      })
  }

  useEffect(() => {
    fetchTask()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(urlCreate, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tasks)
    }).then((res) => {
      fetchTask()
      setTasks([
        {
          ...tasks,
          title: ''
        }
      ])
    }).catch((error) => {
      console.log('ERROR: ', error)
    })
  }

  return (
    <div>
      <div id='task-container'>
        <div id='form-wrapper'>
          <form onSubmit={handleSubmit} id='form'>
            <div className='flex-wrapper'>
              <div style={{ flex: 6 }}>
                <input
                  className='form-control'
                  id='title'
                  type='text'
                  name='title'
                  placeholder='Add task'
                  onChange={(e) => setTasks([
                    {
                      ...tasks,
                      title: e.target.value
                    }
                  ])}
                />
              </div>

              <div style={{ flex: 1 }}>
                <input id='submit' className='btn btn-warning' type='submit' name='Add' />
              </div>
            </div>
          </form>

        </div>

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

      </div>
    </div>
  )
}

export default ApiTodo
