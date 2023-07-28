import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { homeIcon, keyboardArrowRightIcon } from '../components/Images';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const name = auth.currentUser.displayName;
  const { email } = auth.currentUser;

  const onLogout = () => {
    auth.signOut();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="font-nunito grid grid-cols-1 place-items-center p-8">
      <header className="w-full flex justify-between">
        <h2 className="text-2xl font-extrabold">My Profile</h2>
        <button
          type="button"
          className="bg-green-500 rounded-md px-3 text-white hover:bg-green-800"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main className="w-full py-10">
        <p>Personal Details</p>
        <div className="border p-4 mt-4 rounded-md">
          <h4 className="font-extrabold text-2xl">{name}</h4>
          <p>{email}</p>
        </div>

        <div className="py-8">
          <Link to="/add-listing" className="flex justify-between">
            <img
              src={homeIcon}
              alt="Home Icon"
            />
            <p>Sale or Rent your home!</p>
            <img
              src={keyboardArrowRightIcon}
              className="rounded-xl bg-black"
              alt="Arrow Icon"
            />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Profile;
