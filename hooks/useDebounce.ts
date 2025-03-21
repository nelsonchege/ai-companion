import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [deBounceValue, setDeBounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDeBounceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return deBounceValue;
}
