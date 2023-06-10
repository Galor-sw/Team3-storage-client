import React from 'react';

const ShowStorage = ({ items }) => {
  const renderItems = () => {
    return items.items.map((item) => (
      <div key={item.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex items-center mb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-center">{item.name}</h3>
          <img src={item.pic} alt={item.name} className="w-32 h-32 mt-2 mb-2 object-contain" />
          <p className="text-gray-500 mb-2 text-center">{item.amount}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-4/5 p-2 mx-auto">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-wrap -mx-2">{renderItems()}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowStorage;
