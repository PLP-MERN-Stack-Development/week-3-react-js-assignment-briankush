import React, { useState, useEffect } from 'react'
import Card from '../components/card'
import Button from '../components/Button'

function ApiIntegration() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10&q=${search}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchData()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">API Integration</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className="border p-2 rounded flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <Card key={item.id}>
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p>{item.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  )
}

export default ApiIntegration
