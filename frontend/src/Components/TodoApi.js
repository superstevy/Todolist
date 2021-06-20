import React from 'react'

class TodoApi extends React.Component {
  constructor (prop) {
    super(prop)
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false
      },
      editing: false
    }
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentWillMount () {
    this.fetchTasks()
  }

  fetchTasks () {
    console.log('fetching...')
  }

  render () {
    return (
      <div id='task-container'>
        <div id='form-wrapper'>
          <form id='form'>
            <div className='flex-wrapper'>
              <div style={{ flex: 6 }}>
                <input className='form-control' type='text' id='title' placeholder='Add task...' />
              </div>

              <div style={{ flex: 1 }}>
                <input id='submit' className='btn btn-warning' type='submit' name='Add' />
              </div>
            </div>
          </form>
        </div>

        <div id='list-wrapper' />
      </div>
    )
  }
}

export default TodoApi
