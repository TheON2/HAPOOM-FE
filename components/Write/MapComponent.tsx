import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';

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

interface MapComponentProps {
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  locationInput: string;
  setLocationInput: React.Dispatch<React.SetStateAction<string>>;
  location: Location;
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: any;
        Event: {
          once: (
            instance: any,
            eventName: string,
            handler: (...args: any[]) => void
          ) => void;
        };
      };
    };
  }
}

export const MapComponent: React.FC<MapComponentProps> = ({
  setLocation,
  locationInput,
  setLocationInput,
  location,
}) => {
  const [mapOpen, setMapOpen] = useState(false);

  const handleSearchIconClick = () => {
    setMapOpen(true);
  };

  const handleMapClick = useCallback(
    async (event: MapClickEvent) => {
      const coord = event.coord;
      try {
        const response = await axios.get(
          'http://localhost:3001/map/reversegeocode',
          {
            params: {
              x: coord.x,
              y: coord.y,
            },
          }
        );

        const result = response.data.results[0];

        const roadAddress = `${result?.region?.area1?.name} ${result?.region?.area2?.name} ${result?.region?.area3?.name} ${result?.land?.name} ${result?.land?.number1} ${result?.land?.number2} ${result?.land?.addition0?.value}`;

        if (result?.region?.area1?.name === undefined) {
          throw new Error('주소를 가져올 수 없습니다.');
        }

        setLocation({
          name: roadAddress,
          x: coord.x,
          y: coord.y,
        });
      } catch (error) {
        console.error('Geocoding API 호출 중 오류가 발생했습니다:', error);
      }
    },
    [setLocation]
  );

  const handleConfirmClick = () => {
    setLocationInput(location.name);
    setMapOpen(false);
  };

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapOpen && window.naver) {
      mapRef.current = new window.naver.maps.Map(mapContainerRef.current);
      window.naver.maps.Event.once(mapRef.current, 'click', handleMapClick);
    }
  }, [mapOpen, handleMapClick]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
      />
      <input
        type="text"
        placeholder="🔍️"
        value={locationInput}
        onClick={handleSearchIconClick}
        readOnly
      />
      {mapOpen && (
        <div>
          <div
            ref={mapContainerRef}
            id="map"
            style={{ width: '600px', height: '400px' }}
          />
          <button onClick={handleConfirmClick}>확인</button>
        </div>
      )}
    </>
  );
};
