
import { Marker } from "react-native-nmap"
import { View } from "react-native";

import { PRIMARY } from "../colors"
import { useEffect, useState, Fragment } from "react";



// const MemoriesMarker = ({myMarkerLocation}) => {

//   // return myMarkerLocation.map(marker => {

//   //   const [clicked, setClicked] = useState(false);
//   //   const [markerId, setmarkerId] = useState(1);

//     const [renderMarkers, setRenderedMarkers] = useState([]);

//     useEffect(() => {
//       const updatedMarkers = myMarkerLocation.map((marker, index) => {
//         return (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: marker.latitude,
//               longitude: marker.longitude,
//             }}
//             image={
//                 require('../../assets/Icon_Location-2-Unselected.png')
//             }
//           />
//         );
//       });
//       setRenderedMarkers(updatedMarkers);
//     }, [myMarkerLocation]);

//     return (
//       <Fragment>
//         {renderMarkers}
//       </Fragment>
//     );

//     // useEffect(() => {
//     //   setmarkerId(marker.markerId);
//     // }, []);

//     // console.log("id: " + markerId);
//     // return (
//     //     <Marker
//     //       key={marker.latitude}
//     //       coordinate={{
//     //         latitude: marker.latitude,
//     //         longitude: marker.longitude,
//     //       }}
//     //       image={
//     //         clicked ?
//     //           require('../../assets/Icon_Location-2-Selected.png')
//     //         :
//     //           require('../../assets/Icon_Location-2-Unselected.png')
//     //       }
//     //     />
//     // );    
//   // })
// };

const MemoriesMarker = ({myMarkerLocation}) => {
  const [renderMarkers, setRenderedMarkers] = useState([]);

  useEffect(() => {
    setRenderedMarkers(prevMarkers => [
      ...prevMarkers,
      ...myMarkerLocation.map((marker, index) => {
        return (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`} // To make sure keys are unique
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={
              require('../../assets/Icon_Location-2-Unselected.png')
            }
          />
        );
      }),
    ]);
  }, [myMarkerLocation]);

  return (
    <Fragment>
      {renderMarkers}
    </Fragment>
  );
};

export default MemoriesMarker;