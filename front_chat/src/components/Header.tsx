import React from 'react';

const Header: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white shadow p-4 flex justify-between items-center">
    <h2 className="text-2xl font-bold">{title}</h2>
  </div>
);

export default Header;
