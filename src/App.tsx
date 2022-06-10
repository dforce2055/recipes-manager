import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
  
// pages
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'
// components
import Navbar from './components/Navbar'
// styles
import './App.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            
            <Route path="recipes" element={<Recipe />}>
              <Route path=":recipeId" element={<Recipe />} />
              <Route index element={<Recipe />} />
            </Route>
            <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App