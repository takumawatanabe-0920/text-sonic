import { useEffect, useState } from 'react';

// SSR時のHTMLとCSR時のHTMLが異なると、エラーが発生するので、useClientを使って、SSRを実行しないようにすると解決する。
// もしくは、suppressHydrationWarningを設定する。
function useMediaQuery(query: string): boolean {
  // getMatches はwindowに依存しているため、useStateの初期値はgetMatchesに依存させない。なぜならNext.jsがSSRする時にwindowが存在しないため。
  const [matches, setMatches] = useState<boolean>(false);

  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
