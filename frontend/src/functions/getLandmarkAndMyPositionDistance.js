export const getLandmarkAndMyPositionDistance = (landmark, myPosition) => {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const R = 6371;
  const dLat = deg2rad(myPosition.latitude - landmark.landLatitude);
  const dLon = deg2rad(myPosition.longitude - landmark.landLongitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(landmark.landLatitude)) * Math.cos(deg2rad(myPosition.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}