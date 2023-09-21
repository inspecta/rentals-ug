import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from '../styled-components/StyledComponents';
import { bathtubIcon, bedIcon, locationIcon } from '../components/Images';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';
import { auth, db } from '../firebase.config';

const Listing = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="font-bold mb-2">
        <Link to="/offers" className="bg-gray-800 px-3 text-white rounded-full hover:text-gray-400">
          Back
        </Link>
      </div>
      {/* Slider */}
      <div>
        {listing.imgUrls.length === 1
          ? <img src={listing.imgUrls} alt="Gallery listing" />
          : <Slider imgUrls={listing.imgUrls} />}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:px-10">
        <div className="px-4 py-8 bg-white mt-10 mb-10 rounded-lg lg:px-8 lg:mb-0">
          <p className="font-semibold text-sm">
            {listing.type === 'rent'
              ? <span className="bg-green-200 px-4 py-1 rounded-3xl text-[#5ea51e]">Rent</span>
              : <span className="bg-[#ffece8] px-4 py-1 rounded-3xl text-[#f74400]">Sale</span>}
          </p>
          <h1 className="font-bold text-2xl py-4">
            {listing.name}
          </h1>
          <div>
            <p className="flex items-center text-gray-500">
              <img src={locationIcon} className="w-5 mr-1" alt="Listing Location" />
              {listing.address}
            </p>
            <p className="text-[#00c922] text-xl font-bold pt-4">
              UgShs
              {' '}
              {listing.offer
                ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {' '}
            </p>

            {/* Discount */}
            {listing.discountedPrice === 0 ? ''
              : (
                <div className="flex space-x-2 items-center mt-3 pb-3 text-gray-50">
                  <span className="text-gray-800">Discount</span>
                  <p className="bg-black px-3 py-[2px] rounded-md text-sm">
                    UgShs
                    {' '}
                    <span>{(listing.regularPrice - listing.discountedPrice).toLocaleString('en-US')}</span>
                  </p>
                </div>
              )}

            <div className="pb-0">
              <div className="flex flex-col text-gray-400 font-thin gap-4">
                <div className="flex items-center mt-3 md:text-sm">
                  <img src={bedIcon} className="mr-2 w-5" alt="Bedrooms" />
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                </div>
                <div className="flex items-center mb-3 md:text-sm">
                  <img src={bathtubIcon} className="mr-2 w-5" alt="Bathtubs" />
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-8 bg-white mt-10 mb-10 rounded-lg lg:px-8 lg:mb-0">
          {/* Parking && Furnishment */}
          <h3 className="mb-4 font-semibold">Amenities</h3>
          {listing.parking && (
          <div className="flex items-center space-x-4 pt-3 text-white">
            <>
              <div className="w-5 h-5 bg-green-50 border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="#5ea51e" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                {listing.parking && <span>Parking available</span>}
              </p>
            </>
          </div>
          )}

          {listing.furnished && (
          <div className="flex items-center space-x-4 pt-3 text-white">
            <>
              <div className="w-5 h-5 bg-green-50 border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="#5ea51e" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                {listing.furnished && <span>Fully Furnished</span>}
              </p>
            </>
          </div>
          )}

          <div className="flex items-center space-x-4 pt-3 text-white">
            <>
              <div className="w-5 h-5 bg-green-50 border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="#5ea51e" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                <span>Alarm System</span>
              </p>
            </>
          </div>
          <div className="flex items-center space-x-4 pt-3 text-white">
            <>
              <div className="w-5 h-5 bg-green-50 border rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="#5ea51e" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                <span>Window Covering</span>
              </p>
            </>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:px-10">
        {listing.description
          ? (
            <div className="px-4 py-8 bg-white mt-10 rounded-lg lg:px-8 lg:mb-0">
              <div className="font-bold">
                Description
                <p className="text-gray-600 font-thin text-justify py-4">{listing.description}</p>
              </div>
            </div>
          )
          : ''}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:px-10">
        <div className="px-4 py-8 bg-white mt-10 rounded-lg lg:px-8 lg:mb-0">
          <div className="font-bold">
            Location
            {/* Map */}
            <p className="text-gray-500 py-4">Map Loading...</p>
          </div>
        </div>

        <div className="px-4 py-8 bg-white mt-10 rounded-lg lg:px-8 lg:mb-0">
          <div className="font-bold">
            Rating
            <p className="text-gray-500 py-4">Listing Rating</p>
          </div>
        </div>
      </div>
      {/* Contact Owner of the Premise */}
      <div className="px-4 py-4 bg-white mt-10 rounded-lg">
        {auth.currentUser?.uid === listing.userRef && (
        <Link
          to={`/contact/${listing.userRef}?listingName=${listing.name}`}
          className="btn btn-primary rounded-lg"
        >
          Contact Owner
        </Link>
        )}
      </div>
    </Container>
  );
};

export default Listing;
