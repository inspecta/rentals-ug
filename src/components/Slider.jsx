import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, Pagination,
} from 'swiper/modules';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = ({ imgUrls }) => (
  <div className="flex justify-center items-center">
    <Swiper
      modules={[Navigation, Pagination]} // Import the required modules
      spaceBetween={10}
      slidesPerView={1}
      loop
      navigation
      pagination={{ clickable: true }}
      className="h-[400px] xl:h-[600px]"
    >
      {imgUrls.map((imgUrl) => (
        <SwiperSlide key={imgUrl}>
          <img
            src={imgUrl}
            className="w-full h-full object-cover"
            alt="Gallery listing"
          />
          =
          {' '}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

Slider.propTypes = {
  imgUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Slider;
