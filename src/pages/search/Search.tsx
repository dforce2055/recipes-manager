import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch'
import { Recipe } from '../../interfaces'
import RecipeList from '../../components/RecipeList'

// styles
import './search.css'

const Search = () => {
  const { data, isPending, error } = useFetch(`${process.env.REACT_APP_API_URL}/data/db.json`)
  const [recipes, setRecipes] = useState <Recipe[] | null>(null)
  const [query, setQuery] = useState<string>('')
  const [customErrorMessage, setCustomErrorMessage] = useState<string>('Error')
  
  const queryString = useLocation()
  
  useEffect(() => {
    const queryParams = new URLSearchParams(queryString.search)
    const query = queryParams.get('q')
    if(query)
      setQuery(query)
  }, [query, queryString])
  
  
  useEffect(() => {
    // search filter
    const recipes: Recipe[] =
      data?.recipes?.filter((recipe: Recipe) => JSON.stringify(recipe)
        .toLowerCase()
        .includes(query.toLowerCase())
        )
    
    if (recipes && recipes.length > 0) {
      setRecipes(recipes)
      setCustomErrorMessage('')
    }
    else {
      setRecipes([])
      setCustomErrorMessage(`No results for "${query}"`)
    }
  }, [query, data])

  return (
    <div className='search'>
      {error && <h2 className='page-title error'>{error}</h2>}
      {customErrorMessage && <p className='error'>{customErrorMessage}</p>}
      {isPending && <p className='loading'>Loading ...</p>}

      {recipes && recipes.length > 0 &&
        <>
          <h2 className='page-title'>Recipes includes "{query}"</h2> 
        <RecipeList recipes={recipes} />
        </>
      }
    </div>
  )
}

export default Search