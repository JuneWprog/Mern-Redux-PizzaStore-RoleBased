import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <div>
      <h1>404 Page Not Found </h1>
      <button onClick ={handleClick}>Back</button>
    </div>
  )
}

export default NotFound
