import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { InputBox } from '@/styles/write';

interface Location {
  name: string;
  x: number;
  y: number;
}

interface Marker {
  setMap: (map: any | null) => void;
}

interface MapComponentProps {
  location: Location;
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: any;
        Event: {
          addListener: (
            instance: any,
            eventName: string,
            handler: (...args: any[]) => void
          ) => void;
        };
        Marker: any;
        LatLng: any;
      };
    };
  }
}

export const ReadOnlyMap: React.FC<MapComponentProps> = ({ location }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<Marker | null>(null);

  const initializeMap = () => {
    if (
      mapContainerRef.current &&
      location.x &&
      location.y &&
      window.naver?.maps
    ) {
      const centerPosition = new window.naver.maps.LatLng(
        location.y,
        location.x
      );

      mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
        center: centerPosition,
        zoom: 15,
      });

      markerRef.current = new window.naver.maps.Marker({
        position: centerPosition,
        map: mapRef.current,
      });
    }
  };

  useEffect(() => {
    initializeMap();
  }, [location]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
        onReady={() => initializeMap()}
      />
      <InputBox
        type="text"
        placeholder="장소를 입력해주세요"
        value={location.name}
        readOnly
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          margin: '20px 0',
        }}
      >
        <div
          ref={mapContainerRef}
          id="map"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
};
