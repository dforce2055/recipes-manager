import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Recipe } from '../../interfaces'
import RecipeList from '../../components/RecipeList'

// styles
import './home.css'

function Home() {
  const { data, isPending, error } = useFetch('./data/db.json')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipesLS, setRecipesLS] = useLocalStorage<Recipe[]>("recipes", [])

  useEffect(() => {
    let recipes: Recipe[] = []

    if (recipesLS.length > 0)
      recipes = recipesLS
    else if (data?.recipes)
      recipes = data?.recipes
    
    if (recipes) {
      setRecipes(recipes)
      setRecipesLS(recipes)
    }
    
  }, [data, recipesLS, setRecipesLS])

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading ...</p>}
      
      {data && <RecipeList recipes={recipes} />}
    </div>
  )
}

export default Home