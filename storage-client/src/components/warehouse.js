import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowStorage from './showStorage';

const Warehouse = () => {
  const location = useLocation();
  const { warehouse } = location.state;
  const [selectedLink, setSelectedLink] = useState('showStorage');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const items = {
    "items": [
      {
        "id": 1,
        "name": "Shoes",
        "pic": "https://www.vans.co.il/media/catalog/product/cache/c561981a6a0fbcb7af3b8463720b42ef/v/n/vn000d3hy28-hero_2_.jpg",
        "amount": 10
      },
      {
        "id": 2,
        "name": "Polo Shirt",
        "pic": "https://media.shoesonline.co.il/2023/02/men-EA7-Emporio-Armani-polo-shirt-with-short-sleeves__8NZF78-ZJ81Z-1510-1-500x500.jpg",
        "amount": 5
      },
      {
        "id": 3,
        "name": "Softshell",
        "pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sZaxBOcOyxCGXkHRK-YnERcHIFDrcMHuKU16bdtPdkPQGZ0LEKZedCu1ssSmPm1j8PQ&usqp=CAU",
        "amount": 18
      },
      {
        "id": 4,
        "name": "Safari",
        "pic": "https://media.maxport.es/product/camisa-safari-manga-corta-multibolsillos-negro-800x800.jpg",
        "amount": 2
      },
      {
        "id": 5,
        "name": "Belt",
        "pic": "https://cdn.shopify.com/s/files/1/0009/1009/8487/products/BlackClassicSS_938x.jpg?v=1614274106",
        "amount": 7
      },
    ]

  }

  const Content = () => {
    switch (selectedLink) {
      case 'showStorage':
        return <ShowStorage items={items} />;
      case 'requestEquipment':
        return <RequestEquipment items={items} />;
      case 'receivedEquipment':
        return <ReceivedEquipment items={items} />;
      case 'deliverEquipment':
        return <DeliverEquipment items={items} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-col items-center">
        <img src={warehouse.photo} alt={warehouse.name} className="w-48 h-48 object-cover rounded-full" />
        <h1 className="text-2xl font-bold mt-4">{warehouse.name}</h1>
        <hr className="my-4 w-full" />
      </div>
      <div className="w-full flex flex-row mt-8">
        <div className="w-1/5">
          <nav className="flex flex-col justify-start items-center h-full bg-gray-200 py-2 px-2">
            <button
              className={`nav-link ${selectedLink === 'showStorage' ? 'text-green-500 border-green-500 border' : ''}`}
              onClick={() => handleLinkClick('showStorage')}
            >
              Show Storage
            </button>
            <button
              className={`nav-link ${selectedLink === 'requestEquipment' ? 'border-green-500 text-green-500 border' : ''}`}
              onClick={() => handleLinkClick('requestEquipment')}
            >
              Request Equipment
            </button>
            <button
              className={`nav-link ${selectedLink === 'receivedEquipment' ? 'border-green-500 text-green-500 border' : ''}`}
              onClick={() => handleLinkClick('receivedEquipment')}
            >
              Received Equipment
            </button>
            <button
              className={`nav-link ${selectedLink === 'deliverEquipment' ? 'border-green-500 text-green-500 border' : ''}`}
              onClick={() => handleLinkClick('deliverEquipment')}
            >
              Deliver Equipment
            </button>
          </nav>
        </div>
        <div className="w-4/5">
          <Content />
        </div>
      </div>
    </div>
  );
};


const RequestEquipment = () => {
  return <div>Request Equipment Component</div>;
};

const ReceivedEquipment = () => {
  return <div>Received Equipment Component</div>;
};

const DeliverEquipment = () => {
  return <div>Deliver Equipment Component</div>;
};

export default Warehouse;

