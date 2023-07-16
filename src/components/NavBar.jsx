import { Link } from 'react-router-dom';

const NavBar = () => {
  console.log('object');
  return (
    <nav className="w-full p-8 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex justify-between">
        <ul className="hidden md:flex justify-between space-x-5 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
        </ul>
        <div className="md:hidden">
          <p>MENU</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
