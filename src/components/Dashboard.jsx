/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  // deleteDoc,
  // doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import 'font-awesome/css/font-awesome.min.css';
import { getCurrentDate } from '../functions/CalculateDate';
import { profilePhoto } from './Images';
import AddListing from '../pages/AddListing';
import Spinner from './Spinner';
import ListingItem from './ListingItem';
import { DashDiv, DashDivTitle, Title } from '../styled-components/StyledComponents';

const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const name = auth.currentUser.displayName;
  // console.log(typeof auth.currentUser);
  const { email, uid } = auth.currentUser;

  const [listings, setListings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeNavLink, setActiveNavLink] = useState('dashboard');

  // Get the listings registered to the logged in user
  const fetchUserListings = async () => {
    try {
      // Get a reference to the listing collection
      const listingsRef = collection(db, 'listings');

      // Create a query
      const userListingsQuery = query(
        listingsRef,
        where('userRef', '==', uid),
        orderBy('timestamp', 'desc'),
        limit(10),
      );
      // Execute the query
      const listingsSnap = await getDocs(userListingsQuery);

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
    fetchUserListings();
  }, []);

  const rentals = [];
  const sales = [];

  const activeLinkStyles = {
    color: 'rgb(0, 255, 92)',
    borderLeft: '4px solid rgba(0, 255, 92)',
    backgroundColor: 'rgb(255, 255, 255, 0.2)',
  };

  const activePage = (navLink) => ({
    color: navLink === activeNavLink ? activeLinkStyles.color : 'rgb(0, 0, 0)',
    borderLeft: navLink === activeNavLink ? activeLinkStyles.borderLeft : 'none',
    backgroundColor: navLink === activeNavLink ? activeLinkStyles.backgroundColor : 'rgb(0, 0, 0, 0)',
  });

  if (loading) {
    return <Spinner />;
  }

  const onLogout = () => {
    auth.signOut();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  if (listings) {
    sales.push(listings.filter((listing) => (listing.data.type === 'sale')));
    rentals.push(listings.filter((listing) => (listing.data.type === 'rent')));
  }

  return (
    <div className="flex flex-row gap-5 font-nunito w-full">
      <aside className="fixed py-24 bg-gray-400 w-[130px] h-[100vh] md:w-[150px] lg:w-[250px]">
        <div className="text-center lg:px-10 py-3">
          <Link to="/">
            <p className="text-[20px] font-bold text-gray-700">RentalsUg</p>
          </Link>
        </div>
        <div>
          <hr />
          <div className="flex flex-col gap-4 items-center py-5">
            <div>
              <img
                src={profilePhoto}
                className="w-12 h-12 rounded-full"
                alt="Account Owner"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm lg:text-md">{name}</h3>
              <p className="font-thin text-xs lg:text-sm">Property Manager</p>
            </div>
          </div>
          <hr />
          <ul className="list-none mt-2 dashLinks">
            <li>
              <NavLink
                className="dash-navLinks"
                style={activePage('dashboard')}
                onClick={() => setActiveNavLink('dashboard')}
              >
                <i className="fa fa-dashboard" />
                <p className="hidden lg:block">
                  Dashboard
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dash-navLinks"
                style={activePage('addListing')}
                onClick={() => setActiveNavLink('addListing')}
              >
                <i className="fa fa-plus" />
                <p className="hidden lg:block">
                  Add Listing
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dash-navLinks"
                style={activePage('rentals')}
                onClick={() => setActiveNavLink('rentals')}
              >
                <i className="fa fa-home" />
                <p className="hidden lg:block">
                  Rentals
                </p>
                <span className="dash-stats">
                  {loading
                    ? 0
                    : rentals[0].length}
                </span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className="dash-navLinks"
                style={activePage('sales')}
                onClick={() => setActiveNavLink('sales')}
              >
                <i className="fa fa-shopping-cart" />
                <p className="hidden lg:block">
                  Sales
                </p>
                <span className="dash-stats">
                  {loading
                    ? 0
                    : sales[0].length }
                </span>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className="dash-navLinks"
                style={activePage}
                onClick={onLogout}
              >
                <i className="fa fa-sign-out" />
                <p className="hidden lg:block">
                  Logout
                </p>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <main className="py-24 px-3 ml-[130px] flex-1 lg:ml-[250px]">
        <div className="w-full">
          <p>{activeNavLink === 'dashboard' ? '' : null}</p>
          <div className="px-10 py-1 flex flex-col justify-between items-center md:py-3 md:flex-row lg:px-20">
            <p className="font-bold text-xl">Dashboard</p>
            <p className="text-sm text-gray-700 md:text-md lg:text-lg">
              {getCurrentDate()}
            </p>
          </div>
          <hr />
        </div>
        {activeNavLink === 'dashboard' && (
          <div id="main-content">
            <header className="px-0 md:px-5 lg:px-10">
              <Title>
                Account Details
              </Title>
            </header>
            <div className="">
              <DashDiv>
                Banner
              </DashDiv>
              <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
                <DashDiv>
                  <DashDivTitle>Account details</DashDivTitle>
                  <div>
                    <p>
                      <span className="mr-2 font-bold">Name:</span>
                      <span>{name}</span>
                    </p>
                    <p>
                      <span className="mr-2 font-bold">Email:</span>
                      {email}
                    </p>
                  </div>
                </DashDiv>
                <DashDiv>
                  <DashDivTitle>
                    <i className="fa fa-home mr-3 bg-green-400 rounded-full p-2" />
                    Rentals
                  </DashDivTitle>
                  <p className="text-4xl font-bold xl:text-6xl xl:font-extrabold">
                    {rentals[0].length}
                  </p>
                </DashDiv>
                <DashDiv>
                  <DashDivTitle>
                    <i className="fa fa-shopping-cart mr-3 bg-green-400 rounded-full p-2" />
                    Sales
                  </DashDivTitle>
                  <p className="text-4xl font-bold xl:text-6xl xl:font-extrabold">
                    {sales[0].length}
                  </p>
                </DashDiv>
              </div>
            </div>
          </div>
        )}
        {activeNavLink === 'addListing' && (
          <div id="addListing">
            <AddListing />
          </div>
        )}
        {activeNavLink === 'rentals' && (
          <div id="rentals">
            <header className="px-0 md:px-5 lg:px-10">
              <Title>
                Rental Listings
              </Title>
            </header>
            {loading
              ? <Spinner />
              : rentals && rentals.length > 0
                ? (
                  <div className="list-none">
                    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
                      {rentals[0].map((listing) => (
                        <div key={listing.id}>
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
                              timestamp: listing.data.timestamp.toString(),
                            }}
                            id={listing.id}
                            key={listing.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
                : (
                  <div className="h-[50vh] grid items-center justify-center">
                    <p className="text-center font-light text-orange-500 text-xl">
                      No rental listings at the moment.
                    </p>
                  </div>
                )}
          </div>
        )}
        {activeNavLink === 'sales' && (
          <div id="sales" className="">
            <header className="px-0 md:px-5 lg:px-10">
              <Title>
                Sale Listings
              </Title>
            </header>
            {loading
              ? <Spinner />
              : sales && sales.length > 0
                ? (
                  <div className="list-none">
                    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
                      {sales[0].map((listing) => (
                        <div key={listing.id}>
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
                              timestamp: listing.data.timestamp.toString(),
                            }}
                            id={listing.id}
                            key={listing.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
                : (
                  <div className="h-[50vh] grid items-center justify-center">
                    <p className="text-center font-light text-orange-500 text-xl">
                      No sale listings at the moment.
                    </p>
                  </div>
                )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
