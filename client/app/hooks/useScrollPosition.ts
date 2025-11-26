import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
}

/**
 * Custom hook for tracking scroll position and direction
 * @param threshold - Threshold for determining scroll direction
 * @returns Scroll position object
 */
export function useScrollPosition(threshold: number = 10): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
  });

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const currentX = window.scrollX;

    setScrollPosition((prev) => {
      const direction =
        Math.abs(currentY - prev.y) > threshold
          ? currentY > prev.y
            ? 'down'
            : 'up'
          : prev.direction;

      return {
        x: currentX,
        y: currentY,
        direction,
        isAtTop: currentY === 0,
      };
    });
  }, [threshold]);

  useEffect(() => {
    // Set initial position
    handleScroll();

    // Add event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollPosition;
}
