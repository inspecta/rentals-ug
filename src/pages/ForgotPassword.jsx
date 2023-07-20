import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { keyboardArrowRightIcon } from '../components/Images';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent successfully.');
    } catch (error) {
      toast.error('An error has occurred! Try again later.');
    }
  };
  return (
    <div className="font-nunito grid grid-cols-1 place-items-center">
      <header>
        <p className="p-10 text-3xl font-extrabold">Forgot Password!</p>
      </header>

      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <div className="text-right text-sm hover:text-[#59b900] mb-4">
              <Link to="/sign-in">
                Sign In Instead
              </Link>
            </div>
            <button
              type="submit"
              className="bg-[#5ea51e] p-3 flex items-center w-full justify-center"
            >
              <span className="text-xs font-bold text-white hover:text-gray-200">
                Send Reset Link
              </span>
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
      </main>
    </div>
  );
};

export default ForgotPassword;
