import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Recipe } from '../../interfaces'
// styles
import './recipe.css'

const RecipePage = () => {
  const { recipeId } = useParams()
  const { data, isPending, error } = useFetch('http://localhost:3000/data/db.json')
  const [recipe, setRecipe] = useState <Recipe | null>(null)
  const [customErrorMessage, setCustomErrorMessage] = useState <string>('Error')

  useEffect(() => {
    const recipe: Recipe = data?.recipes.find((recipe: Recipe) => recipe.id === recipeId)
    
    if(recipe)
      setRecipe(recipe)
    else
      setCustomErrorMessage(`Recipe with the id: ${recipeId} was not found`)
  }, [recipeId, data])

  return (
    <div className="recipe">
      {error && <p className='error'>{error}</p>}
      {!recipe && <p className='error'>{customErrorMessage}</p>}
      {isPending && <p className='loading'>Loading ...</p>}
      {recipe &&
        <>
          <h2 className="page-title">{recipe?.title}</h2>
          <p>Takes {recipe?.cookingTime} to cook.</p>
          <ul>
            {recipe?.ingredients.map((ingredient: string) => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className='method'>{recipe?.method}</p>
        </>
      }
      
    </div>
  )
}

export default RecipePage