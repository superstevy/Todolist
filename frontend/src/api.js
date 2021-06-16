import React from 'react'
const axios = require('axios').default

function api () {
  const url = 'http://127.0.0.1:8000/'
  return (
    <div>
      {
        async function getTodo () {
          try {
            const response = await axios.get(url, { params: { id: '', name: '' } })
            return response
          } catch (err) {
            console.error(err)
          }
        }
      }
    </div>
  )
}

export default api
