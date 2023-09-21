/* eslint-disable no-nested-ternary */
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import { db } from '../firebase.config';
import { Container } from '../styled-components/StyledComponents';

const Offers = () => {
  // Handle the listings in a useState hook
  const [listings, setListings] = useState(null);

  // Handle the wait while fteching the listings
  const [loading, setLoading] = useState(true);

  // Fectch listings
  const fetchListings = async () => {
    try {
      // Get a reference to the listing collection
      const listingsRef = collection(db, 'listings');

      // Create a query
      const listingsQuery = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10),
      );
      // Execute the query
      const listingsSnap = await getDocs(listingsQuery);

      const listingsResults = [];

      listingsSnap.forEach((doc) => {
        listingsResults.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsResults);
      setLoading(false);
    } catch (error) {
      toast.error('Error while fetching offer listings');
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Container>
      <header className="text-center p-6">
        <p className="text-[#5ea51e] font-bold p-4">OUR PROPERTIES</p>
        <h1 className="py-10 pt-0 text-4xl font-extrabold">Featured Properties</h1>
      </header>
      {loading
        ? <Spinner />
        : (listings && listings.length > 0)
          ? (
            <>
              <main>
                <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
                  {listings.map((listing) => (
                    <ListingItem
                      listing={{
                        type: listing.data.type,
                        imgUrls: listing.data.imgUrls,
                        name: listing.data.name,
                        bedrooms: listing.data.bedrooms,
                        bathrooms: listing.data.bathrooms,
                        regularPrice: listing.data.regularPrice,
                        discountedPrice: listing.data.discountedPrice,
                        address: listing.data.address,
                        offer: listing.data.offer,
                        owner: listing.data.userRef,
                        timestamp: listing.data.timestamp,
                      }}
                      id={listing.id}
                      key={listing.id}
                    />
                  ))}
                </ul>
              </main>
            </>
          )
          : (
            <p className="text-center font-light text-orange-500 text-xl">
              No listings with offers.
            </p>
          )}
    </Container>
  );
};

export default Offers;
