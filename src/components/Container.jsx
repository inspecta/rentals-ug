import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <main className="font-nunito py-24 px-3 bg-[#f3f7fd]">
    {children}
  </main>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
