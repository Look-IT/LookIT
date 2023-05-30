import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

export const MemoriesContext = createContext();

export const useMemoriesContext = () => useContext(MemoriesContext);

export const MemoriesProvider = ({ children }) => {
  const [ myLocation, setMyLocation ] = useState(null);

  const [ memoryId, setMemoryId ] = useState(null);
  const [ trackingLocation, setTrackingLocation ] = useState([]);
  const [ pictureMarker, setPictureMarker ] = useState([]);
  const [ tags, setTags ] = useState([]);

  return (
    <MemoriesContext.Provider
      value={
        {
          myLocation, setMyLocation,
          
          memoryId, setMemoryId,
          trackingLocation, setTrackingLocation,
          pictureMarker, setPictureMarker,
          tags, setTags,
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