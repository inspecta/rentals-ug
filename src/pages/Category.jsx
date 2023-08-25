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
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';

const Category = () => {
  // Handle the listings in a useState hook
  const [listings, setListings] = useState(null);

  // Handle the wait while fteching the listings
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    // Fectch listings
    const fetchListings = async () => {
      try {
      // Get a reference to the listing collection
        const listingsRef = collection(db, 'listings');

        // Create a query
        const listingsQuery = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10),
        );

        // Execute the query
        const listingsSnap = await getDocs(listingsQuery);

        const listingsResults = [];

        listingsSnap.forEach((doc) => (
          listingsResults.push({
            id: doc.id,
            data: doc.data(),
          })
        ));
        setListings(listingsResults);
        setLoading(false);
      } catch (error) {
        toast.error('Error while fetching listings');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div>
      <div className="font-nunito">
        <header className="p-6 text-center">
          <p className="text-[#5ea51e] font-bold p-4">OUR PROPERTIES</p>
          <p className="py-10 pt-0 text-4xl font-extrabold">
            Properties for
            {params.categoryName === 'rent' ? ' rent' : ' sale'}
          </p>
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
              <div className="text-center p-4 text-orange-400 font-thin text-lg">
                <p>
                  Sorry. No listings for
                  {' '}
                  {params.categoryName}
                  {' '}
                  found.
                </p>
              </div>
            )}
      </div>
      <Footer />
    </div>
  );
};

export default Category;
