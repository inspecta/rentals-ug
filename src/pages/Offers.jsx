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
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import { db } from '../firebase.config';

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
    <div>
      <header>
        <p>
          Places with Offers
        </p>
      </header>
      {loading
        ? <ClipLoader />
        : (listings && listings.length > 0)
          ? (
            <>
              <main>
                <ul>
                  {listings.map((listing) => (
                    <ListingItem
                      listing={listing.data}
                      id={listing.id}
                      key={listing.id}
                    />
                  ))}
                </ul>
              </main>
            </>
          )
          : (
            <p>
              No listings with offers.
            </p>
          )}
    </div>
  );
};

export default Offers;
