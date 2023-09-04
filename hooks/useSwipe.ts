import { useState, useRef, useCallback } from 'react';

const useSwipe = (
  leftAction: () => void,
  rightAction: () => void,
  onClickEventAction?: () => void
) => {
  const isMouseDown = useRef<boolean>(false);
  const isSwiping = useRef<boolean>(false); // 추가: 스와이프 동작 감지 여부
  const offsetX = useRef<number>(0);

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const dragDistance = endX !== null && startX !== null ? endX - startX : 0;

  const calculateDragDistance = useCallback(() => {
    if (dragDistance > 50) {
      rightAction();
    } else if (dragDistance < -50) {
      leftAction();
    }
  }, [dragDistance]);

  // 마우스 이벤트
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;
    isSwiping.current = false; // 추가: 스와이프 동작 초기화
    offsetX.current = e.clientX;
    setStartX(e.clientX); // 시작 위치를 저장합니다.
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      if (!isSwiping.current) {
        onClickEventAction && onClickEventAction();
        // 추가: 스와이프가 아닌 클릭 동작일 때만 처리
        // 클릭 이벤트 동작 추가
        // 클릭 동작 수행 후 필요한 코드를 여기에 추가
      } else {
        setEndX(e.clientX);
        calculateDragDistance();
      }
    },
    [calculateDragDistance]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    isSwiping.current = true; // 추가: 스와이프 동작 감지
    setEndX(e.clientX); // 현재 위치를 저장합니다.
  }, []);

  // 터치 이벤트
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      isMouseDown.current = true;
      isSwiping.current = false; // 추가: 스와이프 동작 초기화
      offsetX.current = e.touches[0].clientX;
      setStartX(e.touches[0].clientX); // 시작 위치를 저장합니다.
    },
    []
  );

  // touchmove 이벤트 처리
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    isSwiping.current = true; // 추가: 스와이프 동작 감지
    setEndX(e.touches[0].clientX); // 현재 위치를 저장합니다.
  }, []);

  // touchend 이벤트 처리
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      if (!isSwiping.current) {
        onClickEventAction && onClickEventAction();
        // 추가: 스와이프가 아닌 터치 동작일 때만 처리
        // 터치 이벤트 동작 추가
        // 터치 동작 수행 후 필요한 코드를 여기에 추가
      } else {
        setEndX(e.changedTouches[0].clientX);
        calculateDragDistance();
      }
    },
    [calculateDragDistance]
  );
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (event.deltaX > 50) {
      rightAction();
    } else if (event.deltaX < -50) {
      leftAction();
    }
  };
  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  };
};

export default useSwipe;
