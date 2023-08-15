import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
import { StyledAuthInput } from '@/styles/write';
import styled from 'styled-components';

interface Location {
  name: string;
  x: number;
  y: number;
}

interface MapClickEvent {
  coord: {
    x: number;
    y: number;
  };
}

interface Marker {
  setMap: (map: any | null) => void;
}

interface MapComponentProps {
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  location: Location;
  update: string;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #888;
`;

export const MapComponent: React.FC<MapComponentProps> = ({
  setLocation,
  location,
  update,
}) => {
  const [mapOpen, setMapOpen] = useState(true);
  const [locationInput, setLocationInput] = useState('');
  const mapContainerRef = useRef(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<Marker | null>(null);

  const handleSearchIconClick = useCallback(() => {
    setMapOpen(true);
  }, []);

  const handleMapClick = useCallback(
    async (event: MapClickEvent) => {
      const coord = event.coord;
      if (update === '3') return;
      try {
        const response = await axios.get(
          'http://localhost:3001/api/util/map/reversegeocode',
          {
            params: {
              x: coord.x,
              y: coord.y,
            },
          }
        );

        const result = response.data.results[0];

        let roadAddress = `${result?.region?.area1?.name} ${result?.region?.area2?.name} ${result?.region?.area3?.name} ${result?.land?.name} ${result?.land?.number1} ${result?.land?.number2} ${result?.land?.addition0?.value}`;

        if (roadAddress.includes('undefined')) roadAddress = '도로명 없음';

        setLocation({
          name: roadAddress,
          x: coord.x,
          y: coord.y,
        });

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(coord.y, coord.x),
          map: mapRef.current,
        });

        if (roadAddress === '도로명 없음') {
          setLocationInput(`도로명 없음 x좌표:${coord.x} y좌표:${coord.y}`);
        } else {
          setLocationInput(roadAddress);
        }
      } catch (error) {
        console.error('Geocoding API 호출 중 오류가 발생했습니다:', error);
      }
    },
    [setLocation, setLocationInput, update]
  );
  const handleCloseClick = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    setMapOpen(false);
  }, []);

  const initializeMap = useCallback(() => {
    if (typeof window === 'undefined' || !window.naver || !window.naver.maps) {
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        x: position.coords.longitude,
        y: position.coords.latitude,
      };
      if (update === '1') {
        mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
          center: new window.naver.maps.LatLng(userLocation.y, userLocation.x),
        });
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            userLocation.y,
            userLocation.x
          ),
          map: mapRef.current,
        });
      } else {
        mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
          center: new window.naver.maps.LatLng(location.y, location.x),
        });
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(location.y, location.x),
          map: mapRef.current,
        });
      }

      window.naver.maps.Event.addListener(
        mapRef.current,
        'click',
        handleMapClick
      );
    });
  }, [handleMapClick, location, update]);

  useEffect(() => {
    if (update === '2' || update === '3') {
      setLocationInput(location.name + ' ' + location.x + location.y);
    }
  }, [update, location]);

  useEffect(() => {
    if (mapOpen) {
      initializeMap();
    }
  }, [mapOpen]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
        onLoad={initializeMap}
      />
      <h3 style={{ float: 'left', margin: '10px 0' }}>장소</h3>
      <label></label>
      <StyledAuthInput
        type="text"
        placeholder="🔍️"
        value={locationInput}
        onClick={handleSearchIconClick}
        readOnly
        style={{ width: '100%', border: '2px solid #0084ff', margin: '0' }}
      />
      {mapOpen && (
        <div style={{ position: 'relative', width: '100%', height: '50vh' }}>
          <div
            ref={mapContainerRef}
            id="map"
            style={{ width: '100%', height: '100%' }}
          />
          <CloseButton onClick={handleCloseClick}>X</CloseButton>
        </div>
      )}
    </>
  );
};
