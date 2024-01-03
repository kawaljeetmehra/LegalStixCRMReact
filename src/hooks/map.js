import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen';

const FullScreenControl = () => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const fullscreen = L.control.fullscreen().addTo(map);

    return () => {
      map.removeControl(fullscreen);
    };
  }, [map]);

  return null;
};

const UserMap = ({ latitude, longitude }) => {
  const position = [latitude, longitude];

  const customIcon = L.divIcon({
    className: 'icon',
    html: '<i class="fa fa-map-marker" style="font-size:48px;color:red"></i>',
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '130px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>User Location</Popup>
      </Marker>
      <FullScreenControl />
    </MapContainer>
  );
};

export default UserMap;
