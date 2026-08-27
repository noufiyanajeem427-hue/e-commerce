import { useRef, useCallback, useState } from "react";

interface LongPressOptions {
  onLongPress: (e: React.SyntheticEvent) => void;
  onClick?: (e: React.SyntheticEvent) => void;
  threshold?: number;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  threshold = 450,
}: LongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggered = useRef<boolean>(false);
  const startCoords = useRef<{ x: number; y: number } | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const start = useCallback(
    (event: React.SyntheticEvent) => {
      // If right click, ignore
      if ("button" in event && (event as React.MouseEvent).button !== 0) return;

      isLongPressTriggered.current = false;
      setIsHolding(true);

      const touchEvt = event as React.TouchEvent;
      const mouseEvt = event as React.MouseEvent;

      if (touchEvt.touches && touchEvt.touches.length > 0) {
        startCoords.current = {
          x: touchEvt.touches[0].clientX,
          y: touchEvt.touches[0].clientY,
        };
      } else if (mouseEvt.clientX !== undefined) {
        startCoords.current = {
          x: mouseEvt.clientX,
          y: mouseEvt.clientY,
        };
      }

      timerRef.current = setTimeout(() => {
        isLongPressTriggered.current = true;
        setIsHolding(false);
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          try {
            window.navigator.vibrate(50);
          } catch {
            // Ignore if vibrate is restricted
          }
        }
        onLongPress(event);
      }, threshold);
    },
    [onLongPress, threshold]
  );

  const cancel = useCallback(
    (event: React.SyntheticEvent, shouldTriggerClick = false) => {
      setIsHolding(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (shouldTriggerClick && !isLongPressTriggered.current && onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  const handleMove = useCallback((event: React.TouchEvent) => {
    if (!startCoords.current) return;

    if (event.touches && event.touches.length > 0) {
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;

      const deltaX = Math.abs(currentX - startCoords.current.x);
      const deltaY = Math.abs(currentY - startCoords.current.y);

      // If moved more than 10px, cancel long-press (likely scrolling)
      if (deltaX > 10 || deltaY > 10) {
        setIsHolding(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    }
  }, []);

  return {
    isHolding,
    handlers: {
      onMouseDown: (e: React.MouseEvent) => start(e),
      onMouseUp: (e: React.MouseEvent) => cancel(e, true),
      onMouseLeave: (e: React.MouseEvent) => cancel(e, false),
      onTouchStart: (e: React.TouchEvent) => start(e),
      onTouchEnd: (e: React.TouchEvent) => cancel(e, true),
      onTouchMove: handleMove,
      onContextMenu: (e: React.MouseEvent) => {
        if (isLongPressTriggered.current) {
          e.preventDefault();
        }
      },
    },
  };
};
