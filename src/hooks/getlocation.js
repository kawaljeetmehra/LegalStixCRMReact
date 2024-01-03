import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation('Location access denied');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setUserLocation('Geolocation not supported');
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // Runs once when the component using this hook mounts

  return userLocation;
};

export default useUserLocation;
