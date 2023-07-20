import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { visibilityIcon, keyboardArrowRightIcon } from '../components/Images';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success('Successful Login!');
        navigate('/profile');
      }
    } catch (e) {
      toast.error('Invalid login credentials');
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="font-nunito grid grid-cols-1 place-items-center">
      <header>
        <h1 className="p-10 text-3xl font-extrabold">Welcome Back!</h1>
        <p className="p-10 text-center text-[#5ea51d] font-bold">Sign In Now.</p>
      </header>

      <div>
        <form onSubmit={handleSignIn}>
          <div className="form-control">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleShowPassword}>
              <img
                src={visibilityIcon}
                alt="Show Password"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="text-right text-sm hover:text-[#59b900] mb-4">
            <Link to="/forgot-password">
              Forgot Password
            </Link>
          </div>
          <OAuth />
          <button
            type="submit"
            className="bg-[#5ea51e] p-3 flex items-center w-full justify-center"
          >
            <span className="text-xs font-bold text-white hover:text-gray-200">SIGN IN</span>
            <img
              src={keyboardArrowRightIcon}
              className="rounded-xl fill-white"
              alt="Sign In Icon"
            />
          </button>
          <div className="p-10 text-center hover:text-[#5ea51d] font-normal underline">
            <Link to="/sign-up">
              Sign Up Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
