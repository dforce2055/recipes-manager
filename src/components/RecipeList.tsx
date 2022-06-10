import './recipe-list.css'
import { Recipe } from '../interfaces'
import { Link } from 'react-router-dom'

interface Props {
  recipes: Recipe[],
  showRemove?: boolean,
  removeRecipe?: (id: string | number) => void
}

const RecipeList = ({ recipes, showRemove, removeRecipe }: Props) => {
  const handleRemove = (id: string | number) => { 
    if (removeRecipe)
      removeRecipe(id)
  }
  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div
          className='card'
          key={recipe.id}
        >
          {showRemove &&
            <span
              className='remove'
              onClick={(e) => handleRemove(recipe.id)}
            >
              Remove (?)
            </span>
          }
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}..</div>
          <Link to={`/recipes/${recipe.id}`}>
            Cook this
          </Link>
      </div>
      ))}
    </div>
  )
}

export default RecipeList