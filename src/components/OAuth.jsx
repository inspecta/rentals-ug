import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { googleIcon } from './Images';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = result.user;

      // Check the user against user collection
      const docReference = doc(db, 'users', uid);
      const docSnapshot = await getDoc(docReference);

      // If the user dose not exist, create user
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, 'users', uid), {
          displayName,
          email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success('Successfully authorized with Google!');
      navigate('/dashboard');
    } catch (err) {
      toast.error("Couldn't authorize with Google");
    }
  };

  return (
    <div className="font-nunito grid grid-cols-1 place-items-center">
      <p className="font-bold p-4">
        Sign
        {location.pathname === '/sign-up' ? ' up ' : ' in '}
        with
      </p>
      <button
        type="button"
        className="p-4 border rounded-full mb-8 shadow-md shadow-gray-100"
        onClick={handleGoogleClick}
      >
        <img
          src={googleIcon}
          className="w-8"
          alt="Google"
        />
      </button>
    </div>
  );
};

export default OAuth;
