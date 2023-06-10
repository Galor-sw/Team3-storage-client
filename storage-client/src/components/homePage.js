import React from 'react';
import axios from 'axios';
import Intel from "../pics/Intel.png"
import Wix from "../pics/WIX.png"
import Marvell from "../pics/marvell.png"
import { useNavigate } from 'react-router-dom';

// Assuming you have an array of warehouses
const warehouses = [
  {
    id: 1,
    name: 'Microsoft',
    manager: 'Manager 1',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/250px-Microsoft_logo.svg.png',
  },
  {
    id: 2,
    name: 'AWS',
    manager: 'Manager 2',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/250px-Amazon_Web_Services_Logo.svg.png',
  },
  {
    id: 3,
    name: 'Intel',
    manager: 'Manager 2',
    photo: Intel,
  },
  {
    id: 4,
    name: 'Apple',
    manager: 'Manager 2',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/250px-Apple_logo_black.svg.png',
  },
  {
    id: 5,
    name: 'Wix',
    manager: 'Manager 2',
    photo: Wix,
  },
  {
    id: 6,
    name: 'Marvell',
    manager: 'Manager 2',
    photo: Marvell,
  },
  {
    id: 7,
    name: 'Teva',
    manager: 'Manager 2',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Teva_Pharmaceuticals_logo.png',
  },
  // Add more warehouses here
];

const HomePage = () => {
  const navigate = useNavigate();



  const addUnit = async () => {
    try {
      // Make Axios POST request to login endpoint
      const response = await axios.post('http://localhost:3000/storage/unit', {
        id: 1,
        name: 'SolarEdge',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SolarEdge_logo.svg/2560px-SolarEdge_logo.svg.png',
        city: 'hertzliya',
        street: 'test',
        contactPerson: 'Almog'
      });

      if (1) {

      } else {

      }
    } catch (error) {
      console.error('add Unit error:', error);
    }

  };

  const handleWarehouseClick = (warehouse) => {
    navigate('/warehouse', { state: { warehouse } });
  };

  const renderWarehouses = () => {
    return warehouses.map((warehouse) => (
      <div key={warehouse.id} className="w-1/3 p-4">
        <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center gap-5">
          <div className="w-260px">
            <img
              src={warehouse.photo}
              alt={warehouse.name}
              className="w-[250px] h-48 object-cover rounded-md"
              style={{ margin: '5px' }}
            />
          </div>
          <h3 className="text-xl font-bold mt-4">{warehouse.name}</h3>
          <button onClick={() => handleWarehouseClick(warehouse)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Get In</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Warehouse Storage</h1>
      <button onClick={() => addUnit()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Unit</button>
      <div className="flex flex-wrap justify-center -mx-4">
        {renderWarehouses()}
      </div>
    </div>
  );
};

export default HomePage;
