import { Link } from 'react-router-dom';
import HeroSlider, { Slide } from 'hero-slider';
import Footer from '../components/Footer';
import SliderTiles from '../components/SliderTiles';
import {
  saleCategoryImage, rentCategoryImage, bg1, bg2, bg3, bg4,
} from '../components/Images';

const Explore = () => (
  <div className="font-nunito relative">
    <main className="w-full mb-10">
      <div>
        <HeroSlider
          height="100vh"
          autoplay
          slidingAnimation="left_to_right"
          slidingDuration="250"
          orientation="horizontal"
          initialSlide={1}
          onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
          onChange={(nextSlide) => console.log('onChange', nextSlide)}
          onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
          style={{
            backgroundColor: 'rgba(0,0,0,0.32)',
          }}
          controller={{
            slidingDuration: 250,
            slidingDelay: 50,
            shouldAutoplay: true,
            shouldDisplayButtons: true,
            autoplayDuration: 2000,
          }}
        >
          <Slide
            background={{
              backgroundImage: `url(${bg1}`,
              backgroundAttachment: 'fixed',
            }}
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <SliderTiles
              title="Let Your Home Be Unique & Stylish"
              description="A small river named Duden flows by their place and supplies
              it with the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth."
              buttonText="Learn More"
            />
          </Slide>
          <Slide
            background={{
              backgroundImage: `url(${bg2}`,
              backgroundAttachment: 'fixed',
            }}
          >
            <SliderTiles
              title="Let Your Home Be Unique & Stylish"
              description="A small river named Duden flows by their place and supplies
              it with the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth."
              buttonText="Learn More"
            />
          </Slide>
          <Slide
            background={{
              backgroundImage: `url(${bg3}`,
              backgroundAttachment: 'fixed',
            }}
          >
            <SliderTiles
              title="Let Your Home Be Unique & Stylish"
              description="A small river named Duden flows by their place and supplies
              it with the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth."
              buttonText="Learn More"
            />
          </Slide>
          <Slide
            background={{
              backgroundImage: `url(${bg4}`,
              backgroundAttachment: 'fixed',
            }}
          >
            <SliderTiles
              title="Let Your Home Be Unique & Stylish"
              description="A small river named Duden flows by their place and supplies
              it with the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth."
              buttonText="Learn More"
            />
          </Slide>
        </HeroSlider>
      </div>

      <div className="px-2">
        <h1 className="uppercase text-center mt-10 text-[#5ea51e] font-bold text-sm">
          RentalsUg Categories
        </h1>
        <p className="text-2xl font-bold pb-10 pt-3 text-center">
          Explore Our Categories & Places
        </p>
        <div className="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-2">
          <Link to="/category/rent" className="relative overflow-hidden group">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="category-image"
            />
            <p className="category-text bg-green-500 bg-opacity-80 p-2 rounded-md">
              Places for Rent
            </p>
            <p className="bg-green-500 bg-opacity-80 p-2 text-center text-gray-50 text-md xl:hidden">Places for Rent</p>
          </Link>
          <Link to="/category/sale" className="relative overflow-hidden group">
            <img
              src={saleCategoryImage}
              alt="sale"
              className="category-image"
            />
            <p className="category-text bg-red-500 bg-opacity-80 p-2 rounded-md">
              Places for Sale
            </p>
            <p className="bg-red-500 bg-opacity-80 p-2 text-center text-gray-50 text-md xl:hidden">Places for Sale</p>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Explore;
