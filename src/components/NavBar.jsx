import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full p-5 bg-[#081637]">
      <div className="flex justify-between items-center mb-[0.75rem]">
        <div className="flex items-center">
          <Link to="/">
            <p className="text-3xl text-gray-50 leading-6">Rentals Ug</p>
            <span className="text-xs text-gray-50">REAL ESTATE AGENCY</span>
          </Link>
        </div>
        <div className="text-right">
          <button type="button" className="flex items-center" onClick={toggleMenu}>
            <div className="hamburger cursor-pointer">
              <div className="burger burger-1" />
              <div className="burger burger-2" />
              <div className="burger burger-3" />
            </div>
            <div>
              <p className="text-gray-50">MENU</p>
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="flex flex-col space-y-4 text-white font-nunito"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <li className="nav-link">
              <Link to="/" className="nav-item" onClick={closeMenu}>
                HOME
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/offers" className="nav-item" onClick={closeMenu}>
                OFFERS
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/sign-up" className="nav-item" onClick={closeMenu}>
                PROPERTIES
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/offers" className="nav-item" onClick={closeMenu}>
                CONTACT
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/offers" className="nav-item" onClick={closeMenu}>
                ABOUT
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/sign-in" className="nav-item bg-[#5ea51d] p-3 rounded-sm text-center" onClick={closeMenu}>
                SIGN IN
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
