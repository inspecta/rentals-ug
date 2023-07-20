import { Navigate, Outlet } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuthStatus from '../hooks/useAuthStatus';

const PrivateRoutes = () => {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ClipLoader
          color="#5ea51d"
        />
      </div>
    );
  }

  return (
    loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
  );
};

export default PrivateRoutes;
