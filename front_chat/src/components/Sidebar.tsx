import React from 'react';

const Sidebar: React.FC = () => (
  <div className="w-64 bg-gray-800 text-white h-screen p-4">
    <h1 className="text-xl font-bold mb-6">Dashboard</h1>
    <ul>
      <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Agendamentos</li>
      <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Pacientes</li>
    </ul>
  </div>
);

export default Sidebar;
