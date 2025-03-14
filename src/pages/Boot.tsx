interface BootProps {
  restart: boolean;
  sleep: boolean;
  setBooting: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const loadingInterval = 1;
const bootingInterval = 500;

export default function Boot({ restart, sleep, setBooting }: BootProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (restart && !sleep) setLoading(true);
  }, [restart, sleep]);

  useInterval(
    () => {
      const newPercent = percent + 0.15;
      if (newPercent >= 100) {
        setTimeout(() => {
          setBooting(false);
          setLoading(false);
        }, bootingInterval);
      } else setPercent(newPercent);
    },
    loading ? loadingInterval : null
  );

  const handleClick = () => {
    if (sleep) setBooting(false);
    else if (restart || loading) return;
    else setLoading(true);
  };

  return (
    <div className="size-full flex-center bg-black" onClick={handleClick}>
      <div className="i-fa-brands:apple size-20 text-white -mt-4 sm:size-24" />
      {loading && (
        <div
          className="absolute inset-x-0 top-1/2 h-1 w-56 overflow-hidden rounded bg-gray-500 sm:h-1.5"
          m="t-16 sm:t-24 x-auto"
        >
          <span
            className="absolute top-0 h-full rounded-sm bg-white"
            style={{
              width: `${percent.toString()}%`
            }}
          />
        </div>
      )}
      {!restart && !loading && (
        <div
          pos="absolute top-1/2 inset-x-0"
          m="t-16 sm:t-20 x-auto"
          text="sm gray-200 center"
        >
          Click to {sleep ? "wake up" : "boot"}
        </div>
      )}
    </div>
  );
}
