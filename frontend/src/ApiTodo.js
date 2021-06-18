import React from 'react'
const axios = require('axios').default

function ApiTodo () {
  const url = 'http://127.0.0.1:8000/'
  return (
    <div>
      {
        async function getTodo () {
          try {
            const response = await axios.get(url, { params: { id: '', name: '' } })
            console.log(response.data)
          } catch (err) {
            console.error(err)
          }
        }
      }
    </div>
  )
}

export default ApiTodo
