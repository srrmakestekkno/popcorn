import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      // this runs when the movie details unmounts
      document.addEventListener("keydown", callback);
    };
  }, [key, action]);
}
