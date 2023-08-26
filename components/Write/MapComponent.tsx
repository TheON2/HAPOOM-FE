import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import Script from 'next/script';
import { InputBox, StyledAuthInput } from '@/styles/write';
import styled from 'styled-components';
import { debounce } from 'lodash';
import Button from '../common/Button';
import nookies from 'nookies';
import Modal from '../common/Modal';
import useModal from '@/hooks/useModal';

const SuggestionsBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  &:last-child {
    border-bottom: none;
  }
`;

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
  setIsShowMap: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsShowMap,
}) => {
  const { isModalOpen, modalMessge, openModal, closeModal } = useModal();
  const [mapOpen, setMapOpen] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [locationLatLng, setLocationLatLng] = useState({ x: 0, y: 0 });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<Marker | null>(null);

  const handleMapClick = useCallback(
    async (event: MapClickEvent) => {
      const coord = event.coord;
      if (update === '3') return;
      setLocationLatLng({ x: coord.x, y: coord.y });

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coord.y, coord.x),
        map: mapRef.current,
      });
    },
    [update, setLocationLatLng]
  );

  const handleSearch = async (term: string) => {
    if (term.length >= 4) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/util/map/geocode`,
          {
            params: {
              query: term,
            },
          }
        );
        console.log(response.data);
        const suggestions = response.data.addressInfo.map((info: any) => ({
          address_name: info.road_address_name,
          x: info.x,
          y: info.y,
        }));

        // suggestions를 원하는 대로 사용할 수 있습니다.
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Geocode API 호출 중 오류가 발생했습니다:', error);
      }
    }
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 10), []);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (value.trim() === '') {
        setSuggestions([]);
      } else {
        debouncedSearch(value);
      }
    },
    [debouncedSearch]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: any) => {
      setLocationInput(suggestion.address_name);
      setSuggestions([]);
      // x, y 좌표를 기반으로 지도의 중심을 설정합니다.
      const newPosition = new window.naver.maps.LatLng(
        suggestion.y,
        suggestion.x
      );

      // 지도가 아직 초기화되지 않았다면, 중심 좌표와 마커를 설정합니다.
      if (mapRef.current) {
        mapRef.current.setCenter(newPosition);
        mapRef.current.setZoom(18);

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // 해당 위치에 마커를 찍습니다.
        markerRef.current = new window.naver.maps.Marker({
          position: newPosition,
          map: mapRef.current,
        });
      }

      // 지도를 펼칩니다.
      setLocationLatLng({ y: suggestion.y, x: suggestion.x });
      setMapOpen(true);
    },
    [setMapOpen]
  );

  const initializeMap = () => {
    if (mapContainerRef.current) {
      mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 기본 위치
        zoom: 15,
      });

      window.naver.maps.Event.addListener(
        mapRef.current,
        'click',
        handleMapClick
      );
    }
  };

  const submitLocation = () => {
    setLocation({
      name: locationInput,
      x: locationLatLng.x,
      y: locationLatLng.y,
    });
    setIsShowMap(false);
  };

  const onClickCloseHandler = () => {
    setIsShowMap(false);
  };

  const setToCurrentLocation = useCallback(() => {
    const { currentlocation } = nookies.get();

    if (!currentlocation) {
      openModal({
        actionText: '확인',
        modalMessge:
          '위치정보 탐색을 허용하지 않았을경우 브라우저 상단의 위치정보 사용을 허용해주세요.',
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        nookies.set(null, 'currentlocation', 'true', { path: '/' });
        const { latitude, longitude } = position.coords;
        setLocationInput('내 위치');
        setMapOpen(true);

        if (mapRef.current) {
          const newPosition = new window.naver.maps.LatLng(latitude, longitude);
          mapRef.current.setCenter(newPosition);
          mapRef.current.setZoom(18);

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          markerRef.current = new window.naver.maps.Marker({
            position: newPosition,
            map: mapRef.current,
          });
        }

        setLocationLatLng({ y: latitude, x: longitude });
      },
      async (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          openModal({
            actionText: '확인',
            modalMessge:
              '이 기능을 사용하려면 브라우저 설정에서 위치 권한을 허용한후 브라우저를 재부팅 해주세요.',
          });
        } else {
          console.error('지금 위치를 찾을 수 없습니다.', error);
        }
      }
    );
  }, [setMapOpen]);

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={closeModal}
          actionText={modalMessge.actionText}
          onClickEvent={modalMessge.onClickEvent || null}
        >
          {modalMessge.modalMessge}
        </Modal>
      )}
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
        onReady={() => initializeMap()}
      />
      <h3 style={{ float: 'left', margin: '10px 0' }}>장소</h3>
      <label></label>
      <InputBox
        type="text"
        placeholder="장소를 입력해주세요"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          margin: '20px 0',
        }}
      >
        {suggestions.length > 0 && (
          <SuggestionsBox
            style={{
              position: 'absolute',
              zIndex: 1, // 맵 위로 올리기
            }}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.address_name}
              </SuggestionItem>
            ))}
          </SuggestionsBox>
        )}
        <div
          ref={mapContainerRef}
          id="map"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button
          type="button"
          className="secondary"
          onClick={onClickCloseHandler}
        >
          닫기
        </Button>
        <Button type="button" onClick={setToCurrentLocation}>
          간편 찾기
        </Button>
        <Button
          onClick={submitLocation}
          type="button"
          className={!mapOpen ? 'secondary' : undefined}
        >
          확인
        </Button>
      </div>
    </>
  );
};
