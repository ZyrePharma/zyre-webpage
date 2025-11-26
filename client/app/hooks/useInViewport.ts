import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for determining if element is in viewport
 * @param threshold - Threshold for intersection (0-1)
 * @returns Boolean indicating if element is in viewport
 */
export function useInViewport(
  threshold: number = 0.1
): [boolean, React.RefObject<HTMLElement | null>] {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [isInViewport, ref];
}
