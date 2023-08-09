import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import styled from 'styled-components';
import { MapComponent } from '../Write/MapComponent';

interface DetailMapComponentProps {
  location: {
    name: string;
    x: number;
    y: number;
  };
}

export const DetailMapComponent: React.FC<DetailMapComponentProps> = ({
  location,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (window.naver) {
      mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
        center: new window.naver.maps.LatLng(location.y, location.x),
        zoom: 10,
      });
      markerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.y, location.x),
        map: mapRef.current,
      });
    }
  }, [location]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
      />
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default DetailMapComponent;
