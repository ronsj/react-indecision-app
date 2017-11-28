import React from 'react';

const Header = (props) => {
  const { title, subtitle } = props;
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
}
Header.defaultProps = {
  title: 'Indecision'
}

export default Header;
