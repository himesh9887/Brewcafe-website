import React from 'react';

const Card = ({ as = 'div', className = '', children, ...rest }) => React.createElement(
  as,
  { className: `card ${className}`, ...rest },
  children,
);

export default Card;
