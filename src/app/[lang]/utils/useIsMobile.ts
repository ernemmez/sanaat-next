import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [matches, setMatches] = useState(null);
  const query = "(max-width: 900px)";

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = (e: any) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener('change', handleMatchChange);
    //@ts-ignore
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange);
    };
  }, [query]);

  return matches;
}