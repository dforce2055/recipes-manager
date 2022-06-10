import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// styles
import './search-bar.css'

const SearchBar = () => {
  const [term, setTerm] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search?q=${term}`)
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  )
}

export default SearchBar