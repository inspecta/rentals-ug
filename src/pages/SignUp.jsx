import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase.config';
import { visibilityIcon, keyboardArrowRightIcon } from '../components/Images';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, email, password,
      );
      const { uid } = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Persist the user info
      const formDataCopy = {
        ...formData,
      };

      // Don't persist the password
      delete formDataCopy.password;

      // Add a timestamp to the user data
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', uid), formDataCopy);
      toast.success('You have successfully been registered!');
      navigate('/profile');
    } catch (e) {
      toast.error('Oops. Something went wrong!');
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="font-nunito grid grid-cols-1 place-items-center">
      <header>
        <h1 className="p-10 text-3xl font-extrabold">You Are Welcome!</h1>
        <p className="p-10 text-center text-[#5ea51d] font-bold">Sign Up Today.</p>
      </header>

      <div>
        <form onSubmit={handleRegister}>
          <div className="form-control">
            <input
              type="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
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
          <OAuth />
          <button
            type="submit"
            className="bg-[#5ea51e] p-3 flex items-center w-full justify-center"
          >
            <span className="text-xs font-bold text-white hover:text-gray-200">SIGN UP</span>
            <img
              src={keyboardArrowRightIcon}
              className="rounded-xl fill-white"
              alt="Sign In Icon"
            />
          </button>
        </form>
        <div className="p-10 text-center hover:text-[#5ea51d] font-normal underline">
          <Link to="/sign-in">
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
