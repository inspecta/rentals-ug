import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
        console.log(docSnap.data());
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
    <main className="font-nunito p-3 bg-[#f7f7f7] lg:p-3 xl:p-9">
      <div className="font-bold mb-2">
        <Link to="/offers" className="bg-gray-800 px-3 text-white hover:text-gray-400">
          <span>{'<'}</span>
          {' '}
          Back
        </Link>
      </div>
      {/* Slider */}
      {listing.imgUrls.length === 1
        ? <img src={listing.imgUrls} alt="Gallery listing" />
        : <Slider imgUrls={listing.imgUrls} />}
      <div className="p-3">
        <h1 className="font-bold text-2xl py-4">
          {listing.name}
          {' '}
          @
          <span className="text-[#00c922]">
            {listing.offer
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {' '}
            /=
          </span>
        </h1>
        <p className="font-bold flex items-center">
          <img src={locationIcon} className="w-5 mr-1" alt="Listing Location" />
          {listing.address}
        </p>
      </div>
      <div className="px-3">
        <div className="flex space-x-5 items-center pb-3 text-gray-50">
          <p>
            {listing.type === 'rent'
              ? <span className="bg-[#5ea51e] px-2 rounded-md">For Rent</span>
              : <span className="bg-orange-500 px-2 rounded-md">For Sale</span>}
          </p>

          {/* Discount */}
          <p className="bg-black px-3 rounded-md text-sm">
            <span>{(listing.regularPrice - listing.discountedPrice).toLocaleString('en-US')}</span>
            /= discount
          </p>
        </div>
        <div className="pb-3">
          <div className="flex items-center text-gray-400 font-thin space-x-4">
            <div className="flex md:text-sm">
              <img src={bedIcon} className="mr-2 w-5" alt="Bedrooms" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
            </div>
            <div className="flex md:text-sm">
              <img src={bathtubIcon} className="mr-2 w-5" alt="Bathtubs" />
              {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
            </div>
          </div>
          {/* Parking && Furnishment */}
          <div className="flex space-x-4 pt-2 text-white">
            <div className="bg-[#5ea51e] px-3 rounded-sm font-thin">{listing.parking && 'Parking available'}</div>
            <div className="bg-[#5ea51e] px-3 rounded-sm font-thin">{listing.furnished && 'Fully furnished'}</div>
          </div>
        </div>

        <div className="font-bold">
          Location
          {/* Map */}
          <p className="text-gray-500 py-4">Map Loading...</p>
        </div>

        {/* Contact Owner of the Premise */}
        {auth.currentUser?.uid === listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="btn btn-primary mb-8"
          >
            Contact Owner
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
