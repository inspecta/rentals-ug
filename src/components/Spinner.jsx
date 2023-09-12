import { FadeLoader } from 'react-spinners';

const Spinner = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center bg-transparent">
    <FadeLoader
      radius={10}
      color="#5ea51e"
    />
  </div>
);

export default Spinner;
