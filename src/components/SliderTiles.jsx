import PropTypes from 'prop-types';

const SliderTiles = ({ title, description, buttonText }) => (
  <div className="h-screen flex items-center justify-center relative">
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
    <div className="px-4 bg-white bg-opacity-10 relative text-center h-screen
      w-screen flex flex-col items-center justify-center lg:px-[200px] xl:px-[300px]"
    >
      <h2 className="
        text-[40px] mb-8 mt-8 text-white leading-[45px] font-bold lg:text-[55px]
        xl:text-[60px] xl:leading-tight
        "
      >
        {title}
      </h2>
      <p className="text-gray-200 text-[16px] mb-8 text-center leading-7 xl:text-[20px]">
        {description}
      </p>
      <p className="
        uppercase text-[12px] font-semibold bg-[#5ea51e] text-white px-16 py-4 mt-5
        xl:text-[15px] cursor-pointer hover:bg-[#36690a]
        "
      >
        {buttonText}
      </p>
    </div>
  </div>
);

SliderTiles.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default SliderTiles;
