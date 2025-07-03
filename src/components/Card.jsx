import React from 'react'

function Card({ children }) {
  return (
    <div className="border rounded shadow p-4 bg-white">
      {children}
    </div>
  )
}

export default Card
