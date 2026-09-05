import React, { createContext, useContext, useState } from 'react';

const OwnerContext = createContext();
export const OwnerProvider = ({ children }) => {
  const [store, setStore] = useState({
    name: 'My Shop',
    revenue: 24500,
    orders: 328,
    products: 142,
  });
  return (
    <OwnerContext.Provider value={{ store, setStore }}>
      {children}
    </OwnerContext.Provider>
  );
};
export const useOwner = () => useContext(OwnerContext);

export default OwnerContext;
