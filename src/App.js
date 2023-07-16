import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Explore, ForgotPassword, Offers, Profile, SignIn, SignUp, NavBar,
} from './components/Pages';

const App = () => (
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  </>
);

export default App;
