import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState([]);


  //useeffect to load data each time component rendered
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/storage/');
        const data = response.data;
        setWarehouse(data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchWarehouses();
  }, []);


  const handleButtonClick = () => {
    navigate('/addunit');
  };

  const handleWarehouseClick = (warehouse) => {
    navigate('/warehouse', { state: { warehouse } });
  };

  const renderWarehouses = () => {
    return warehouse.map((warehouse) => (
      <div key={warehouse._id} className="w-1/3 p-4">
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
      <button onClick={() => handleButtonClick()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Unit</button>
      <div className="flex flex-wrap justify-center -mx-4">
        {renderWarehouses()}
      </div>
    </div>
  );
};

export default HomePage;
