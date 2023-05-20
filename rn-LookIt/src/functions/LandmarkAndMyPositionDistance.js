import { useEffect } from "react";

const LandmarkAndMyPositionDistance = (landmarks, myPosition) => {
  console.log('------------------------');
  console.log('landmarks: ', landmarks);
  console.log('myPosition', myPosition);
  console.log('------------------------');
  const R = 6371;

  useEffect(() => {
    const newDistances = landmarks.map((landmark, index) => {
      const distance = getDistanceFromLatLonInKm(
        myPosition.latitude, myPosition.longitude,
        landmark.latitude, landmark.longitude
      );
      return `Distance to Landmark ${index + 1}: ${distance} km`;
    });
    
    setDistances(newDistances);
  }, [myPosition]);

  // landmarks.map((landmark, index) => {
  //   console.log(`Landmark ${index + 1}: ${landmark.landmarkId}`);
  // })
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}

export default LandmarkAndMyPositionDistance;