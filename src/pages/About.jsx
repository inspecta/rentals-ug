import React from 'react';
import Container from '../components/Container';

const About = () => (
  <Container>
    <header className="text-center">
      <p className="text-[#5ea51e] font-bold p-4">About Us</p>
      <h1 className="py-10 pt-0 text-4xl font-extrabold">
        RentalsUg
      </h1>
    </header>

    <div className="container mx-auto px-4">

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
        <p className="text-gray-700">
          At RentalsUg, our mission is to simplify the process of finding and renting
          properties in Uganda. We strive to connect tenants with their ideal rental
          properties while helping property owners and managers reach a wider audience.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Who We Are</h3>
        <p className="text-gray-700">
          RentalsUg is a leading online platform dedicated to property rentals in
          Uganda. We have been serving tenants and property owners since [Year Established].
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">What We Offer</h3>
        <p className="text-gray-700">
          RentalsUg hosts an extensive database of rental properties across Uganda.
          Whether you are looking for apartments, houses, or commercial spaces, we
          have you covered.
        </p>
        <p className="text-gray-700">
          Our user-friendly website and search features make it easy for tenants
          to find the right property that suits their needs.
        </p>
        <br />
        <p className="text-gray-700">
          For property owners and managers, RentalsUg offers a platform to showcase
          their properties to a broader audience, helping them fill vacancies faster.
        </p>
      </section>
    </div>
  </Container>
);

export default About;
