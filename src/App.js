import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Explore, ForgotPassword, Offers, Profile, SignIn, SignUp, NavBar,
  PrivateRoutes, Category, AddListing,
} from './components/Pages';

const App = () => (
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>

    <ToastContainer />
  </>
);

export default App;
