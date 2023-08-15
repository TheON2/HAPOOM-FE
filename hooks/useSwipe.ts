import { useState, useRef, useCallback } from 'react';

const useSwipe = (leftAction: () => void, rightAction: () => void) => {
  const isMouseDown = useRef<boolean>(false);
  const offsetX = useRef<number>(0);

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const dragDistance = endX !== null && startX !== null ? endX - startX : 0;
  console.log(dragDistance);
  const calculateDragDistance = useCallback(() => {
    if (dragDistance > 50) {
      rightAction();
    } else if (dragDistance < -50) {
      leftAction();
    }
  }, [startX, endX, dragDistance]);

  // 마우스 이벤트
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;
    offsetX.current = e.clientX;
    setStartX(e.clientX); // 시작 위치를 저장합니다.
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      setEndX(e.clientX);
      calculateDragDistance();
    },
    [calculateDragDistance]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    setEndX(e.clientX); // 현재 위치를 저장합니다.
  }, []);

  // 터치 이벤트
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      isMouseDown.current = true;
      offsetX.current = e.touches[0].clientX;
      setStartX(e.touches[0].clientX); // 시작 위치를 저장합니다.
    },
    []
  );

  // touchmove 이벤트 처리
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    setEndX(e.touches[0].clientX); // 현재 위치를 저장합니다.
  }, []);

  // touchend 이벤트 처리
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      setEndX(e.changedTouches[0].clientX);
      calculateDragDistance();
    },
    [calculateDragDistance]
  );

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
export default useSwipe;
