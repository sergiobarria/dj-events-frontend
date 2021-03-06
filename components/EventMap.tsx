import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

import { IEventLong } from 'types';

const EventMap: React.FC<{ evt: IEventLong }> = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  // Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  return <div>MAP</div>;
};

export default EventMap;
