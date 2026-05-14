import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependency: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependency]);

  return scrollRef;
};
