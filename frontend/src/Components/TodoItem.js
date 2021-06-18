import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../Redux/actions'
function TodoItem ({ todo }) {
  const [editable, setEditable] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const dispatch = useDispatch()
  return (
    <div id='list-wrapper'>
      <div className='row mx-2 align-items-center'>
        <div className='id'>
          {/* {(title !== '') && `#${todo.id.length > 1 ? todo.id[2] : todo.id}`} */}{todo.id}
        </div>
        <div className='task-wrapper flex-wrapper'>
          {editable
            ? <form id='form'>
                <div className='flex-wrapper'>
                  <div style={{ flex: 6 }}>
                    <input
                      className='form-control'
                      id='title'
                      type='text'
                      name='title'
                      placeholder='Add task'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  {
                    (title !== '') &&
                      <button
                        onClick={() => {
                          dispatch(updateTodo(
                            {
                              ...todo,
                              title: title
                            }
                          ))
                          if (editable) {
                            setTitle(todo.title)
                          }
                          setEditable(!editable)
                        }}
                        className='btn btn-primary m-2'
                      >{editable ? 'Update' : 'Edit Task'}
                      </button>
                  }
                </div>
              </form>
            // <input
            //     type='text'
            //     className='btn btn-outline-info'
            //     value={title}
            //     onChange={
            //       (e) => setTitle(e.target.value)
            //     }
            //   />
            : <h4>{todo.title}</h4>}
        </div>
        {/* {
          (title !== '') &&
            <button
              onClick={() => {
                dispatch(updateTodo(
                  {
                    ...todo,
                    title: title
                  }
                ))
                if (editable) {
                  setTitle(todo.title)
                }
                setEditable(!editable)
              }}
              className='btn btn-primary m-2'
            >{editable ? 'Update' : 'Edit Task'}
            </button>
        } */}
        {
          (title !== '') &&
            <button
              onClick={() => {
                if (completed) {
                  dispatch(deleteTodo(todo.id))
                }
                setCompleted(!completed)
              }}
              className='btn btn-outline-dark'
            >{completed ? '-' : 'Click When Done'}
            </button>
        }
      </div>
    </div>
  )
}

export default TodoItem
