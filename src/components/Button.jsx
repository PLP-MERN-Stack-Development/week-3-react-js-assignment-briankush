import React from 'react'

const baseStyles = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2'
const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  )
}

export default Button
