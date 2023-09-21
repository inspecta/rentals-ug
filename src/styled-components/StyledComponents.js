import PropTypes from 'prop-types';
import tw from 'tailwind-styled-components';

export const Title = tw.h1`
  text-center py-8 text-xl font-extrabold text-green-500 lg:text-3xl
`;

export const Container = tw.main`
  font-nunito py-24 px-3 bg-[#f3f7fd]
`;

export const Header = tw.header`
  w-full flex justify-center items-center
`;

// Buttons

export const Button = ({
  $primary, type, btnText, btnImage,
}) => (
  <button
    type={type ? 'submit' : 'button'}
    className={`
      rounded-sm px-3 py-2 mt-2 flex items-center font-thin text-white md:text-lg
      ${$primary ? 'bg-[#5ea51e] justify-center hover:bg-[#43810c]' : 'bg-orange-500 hover:bg-orange-600 transition-colors'}
    `}
  >
    <span className="text-xs font-bold text-white uppercase">{btnText}</span>
    {btnImage && <img src={btnImage} alt="Button Icon" className="rounded-xl fill-white" />}

  </button>
);

// Dashboard

export const DashDiv = tw.div`
  w-full p-4 border mt-4 rounded-md
`;

export const DashDivTitle = tw.h2`
  text-left py-4 pt-0 text-md font-light text-black lg:text-2xl lg:font-extrabold
`;

Button.propTypes = {
  $primary: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  btnText: PropTypes.string.isRequired,
  btnImage: PropTypes.string,
};

Button.defaultProps = {
  btnImage: '',
};
