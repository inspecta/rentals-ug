import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import calculateTimeDifference from '../functions/CalculateDate';
import {
  bathtubIcon, bedIcon, defaultUserIcon, locationIcon,
} from './Images';

// Props - Listing results icons (listing, id)
const ListingItem = ({ listing, id }) => {
  // Set the user data
  const [listOwner, setListOwner] = useState({});
  const [timeAgo, setTimeAgo] = useState('');

  const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  fetchUserData(listing.owner).then((userData) => {
    if (userData) {
      setListOwner(userData);
    }
  });

  // Calculate duration of the listing
  useEffect(() => {
    const calculateListingDuration = calculateTimeDifference(listing.timestamp);
    setTimeAgo(calculateListingDuration);
  }, []);

  if (!listing || !listing.type || !listing.imgUrls) {
    // Handle the case when the necessary data is not available
    return null;
  }

  // const onDelete = () => console.log('Delete');

  return (
    <li className="mb-10 shadow-md bg-white w-full ">
      <div className="flex flex-col justify-center items-center">
        <Link
          to={`/category/${listing.type}/${id}`}
          className="w-full p-3 md:p-4"
        >
          <div className="">
            <div className="w-full h-[300px] relative">
              <div className="relative w-full h-full">
                <img
                  src={listing.imgUrls[0]}
                  alt={listing.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 opacity-0 hover:opacity-100" />
              </div>
              <div className="absolute bottom-4 left-4 p-2 btn btn-primary text-white rounded-md">
                <p className="text-white text-lg">
                  {listing.offer
                    ? (
                      <span className="font-semibold">
                        {listing.discountedPrice.toLocaleString('en-US')}
                      </span>
                    )
                    : (
                      <span className="text-white">
                        {listing.regularPrice.toLocaleString('en-US')}
                      </span>
                    )}
                  <span className="font-semibold">
                    /=
                  </span>
                  {listing.type === 'rent' ? (
                    <span className="text-gray-300"> per month</span>
                  ) : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 md:w-full">
            {/*
            * Owner of the Listing and how long ago the listing was posted
          */}
            <div className="px-1 py-4 flex justify-between items-center font-thin text-gray-600">
              <div className="flex items-center space-x-4">
                <img
                  src={defaultUserIcon}
                  className="w-9"
                  alt="Listing owner"
                />
                <p>{listOwner.name}</p>
              </div>
              <div>
                <p className="md:font-thin md:text-sm">{timeAgo}</p>
              </div>
            </div>

            <div className="md:full">
              <p className="mb-2 font-semibold text-xl">{listing.name}</p>
              <div className="flex items-center space-x-5 mb-4 md:w-full">
                <p className="flex items-center">
                  <img src={locationIcon} alt="Location" className="w-4 mr-1" />
                  <span className="text-gray-400 font-normal text-sm">{listing.address}</span>
                </p>
                <p className="text-white">
                  {
                  listing.type === 'rent'
                    ? <span className="bg-[#5ea51e] px-2">Rent</span>
                    : <span className="bg-orange-500 px-2">Sale</span>
                }
                </p>
              </div>
              <div className="flex items-center text-gray-400 font-thin">
                <img src={bedIcon} alt="bed" className="mr-2 w-5" />
                <p className="mr-4 md:text-sm">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom' }
                </p>
                <img src={bathtubIcon} alt="bathtub" className="mr-2 w-5" />
                <p className="md:text-sm">
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom' }
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/*
        * In the profiles page, the owner of the listing can delete it
      */}
      {/* {onDelete && (
      <div className="">
        <button
          type="button"
          onClick={() => onDelete(id, listing.name)}
          className="flex btn btn-secondary"
        >
          Delete
          <img
            src={deleteIcon}
            alt="delete listing"
            className="filter invert"
          />
        </button>
      </div>
      )} */}
    </li>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.shape({
    type: PropTypes.string.isRequired,
    imgUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ListingItem;
