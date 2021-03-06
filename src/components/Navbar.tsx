import './navbar.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';

interface Props {
  test?: boolean,
}
const Navbar = ({ test }: Props) => {
  return (
    <div
      className='navbar'
    >
      <nav>
        <Link to='/' className='brand'>
          <h1>Recipe Maganer</h1>
        </Link>
        <SearchBar />
        <Link to='/create'>
          <h1>Create Recipe</h1>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar