import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function RouterLoadingBar() {
  const isPending = useRouterState({
    select: (state) => state.status === 'pending',
  });

  const [loadingWidth, setLoadingWidth] = useState('0%');
  const [loadingOpacity, setLoadingOpacity] = useState(1);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (isPending) {
      setLoadingWidth('0%');
      setLoadingOpacity(1);

      timeouts.push(
        setTimeout(() => {
          setLoadingWidth('50%');
        }, 100),
      );
    } else {
      timeouts.push(
        setTimeout(() => {
          setLoadingWidth('100%');
        }, 0),
      );
      timeouts.push(
        setTimeout(() => {
          setLoadingOpacity(0);
        }, 500), // Allow some time at 100% before fading out
      );
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isPending]);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-red-500 z-50"
      style={{
        width: loadingWidth,
        opacity: loadingOpacity,
        transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    ></div>
  );
}
