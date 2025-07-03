import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
