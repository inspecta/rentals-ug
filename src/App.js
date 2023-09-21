import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import {
  ForgotPassword, Offers, SignIn, SignUp, NavBar,
  PrivateRoutes, Category, AddListing, Listing, Contact, Footer, About,
} from './components/Pages';
import Explore from './pages/Explore';

const App = () => (
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/category/:categoryName/:listingId" element={<Listing />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/contact/:ownerId" element={<Contact />} />
      </Routes>
    </Router>

    <ToastContainer />
    <Footer />
  </>
);

export default App;
