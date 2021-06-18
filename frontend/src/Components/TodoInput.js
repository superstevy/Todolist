import React, { useState } from 'react'
import { addTodo } from '../Redux/actions'
import { v1 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'

// function TodoInput () {
//   const [name, setName] = useState('')
//   const dispatch = useDispatch()
//   return (
//     <div>
//       <div className='row m-2'>
//         <h1>Enter a task below!</h1>
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           type='text'
//           className='col form-control'
//           placeholder='Enter your task here'
//         />
//         <button
//           onClick={() => {
//             (name !== '') &&
//             dispatch(addTodo(
//               {
//                 id: uuid(),
//                 name: name
//               }
//             ))
//             setName('')
//           }}
//           className='col btn btn-primary mx-2'
//         >Add Task
//         </button>
//       </div>
//     </div>
//   )
// }

function TodoInput () {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  return (
    <div id='task-container'>
      <div id='form-wrapper'>
        <form id='form'>
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

            <div style={{ flex: 1 }}>
              <input
                id='submit'
                className='btn btn-warning'
                type='submit'
                name='Add'
                onClick={() => {
                  (title !== '') &&
                    dispatch(addTodo(
                      {
                        id: uuid(),
                        title: title,
                        completed: false
                      }
                    ))
                  setTitle('')
                }}
              />
            </div>
          </div>
        </form>

      </div>

    </div>
  )
}

export default TodoInput
