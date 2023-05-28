import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

export const MemoriesContext = createContext();

export const useMemoriesContext = () => useContext(MemoriesContext);

export const MemoriesProvider = ({ children }) => {
  const [myLocation, setMyLocation] = useState(null);
  const [trackingLocation, setTrackingLocation] = useState([]);

  return (
    <MemoriesContext.Provider
      value={
        {
          myLocation, setMyLocation,
          trackingLocation, setTrackingLocation,
        }
      }>

      {children}

    </MemoriesContext.Provider>
  );
};

MemoriesProvider.prototype = {
  children: PropTypes.node,
}

export default MemoriesContext;