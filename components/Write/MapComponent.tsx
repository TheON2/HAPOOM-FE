import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
import { StyledAuthInput } from '@/styles/write';

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

export const MapComponent: React.FC<MapComponentProps> = ({
  setLocation,
  locationInput,
  setLocationInput,
  location,
}) => {
  const [mapOpen, setMapOpen] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef<Marker | null>(null);

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
      } catch (error) {
        console.error('Geocoding API 호출 중 오류가 발생했습니다:', error);
      }
    },
    [setLocation]
  );

  const handleConfirmClick = () => {
    if (location.name.includes('undefined')) {
      const userConfirmed = window.confirm(
        '이 주소는 도로명을 확인할 수 없습니다. 이 위치로 하시겠어요?'
      );
      if (userConfirmed) {
        setLocationInput('Undefined address');
      } else {
        return;
      }
    } else {
      setLocationInput(location.name);
    }
    setMapOpen(false);
  };

  useEffect(() => {
    if (mapOpen && window.naver) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            x: position.coords.longitude,
            y: position.coords.latitude,
          };
          mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
            center: new window.naver.maps.LatLng(
              userLocation.y,
              userLocation.x
            ),
          });
          window.naver.maps.Event.addListener(
            mapRef.current,
            'click',
            handleMapClick
          );
        });
      } else {
        mapRef.current = new window.naver.maps.Map(mapContainerRef.current);
        window.naver.maps.Event.addListener(
          mapRef.current,
          'click',
          handleMapClick
        );
      }
    }
  }, [mapOpen, handleMapClick]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
      />
      <StyledAuthInput
        type="text"
        placeholder="🔍️"
        value={locationInput}
        onClick={handleSearchIconClick}
        readOnly
        style={{ width: '600px' }}
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
