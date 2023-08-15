import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center bg-transparent">
    <ClipLoader
      color="#5ea51e"
      size={50}
    />
  </div>
);

export default Spinner;
