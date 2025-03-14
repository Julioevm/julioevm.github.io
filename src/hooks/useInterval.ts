// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useInterval(callback: Function, delay?: number | null) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [delay]);
}
