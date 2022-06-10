import { useEffect, useState, useRef } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Recipe } from '../../interfaces'
import { v4 as uuid } from 'uuid'
// import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
// styles
import './create.css'

const Create = () => {
  const [title, setTitle] = useState<string>('')
  const [method, setMethod] = useState<string>('')
  const [cookingTime, setCookingTime] = useState<string>('')
  const [newIngredient, setNewIngredient] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const ingredientInput = useRef<any>(null)
  const [recipesLS, setRecipesLS] = useLocalStorage<Recipe[]>("recipes", [])
  const [newRecipe, setNewRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // TODO: implemente post and save it on Firebase
  // const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let recipes: Recipe[] = []

      if (recipesLS)
        recipes = [...recipesLS]
      
      const newRecipe: Recipe = { id: uuid(), title, method, cookingTime, ingredients }
      setNewRecipe(newRecipe)

      recipes = [...recipes, newRecipe]

      setRecipesLS(recipes)
      // TODO: implemente post and save it on Firebase
      // postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    } catch (error) {
      setError('Error creating recipe')
    }
  }

  useEffect(() => {
    if (newRecipe)
      navigate('/')
  }, [newRecipe, navigate])

  const handleAddIngredient = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const ingredient = newIngredient.trim()
      // set uniques ingredients
      if (ingredient && !ingredients.includes(ingredient))
        setIngredients([...ingredients, ingredient])
      
      setNewIngredient('')
      ingredientInput?.current?.focus()
      
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a new Reciope</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button
              className="btn"
              type="button"
              onClick={handleAddIngredient}
            >
              add
            </button>
          </div>
        </label>
        <p>Current ingredients: {ingredients?.map(ingredient => <em key={ingredient}>{ ingredient }, </em>)}</p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button
          className="btn"
          type="submit"
        >
          Add recipe
        </button>
      </form>
    </div>
  )
}

export default Create