import { FC, useEffect, useRef, useState } from 'react';

type TimerProps = {
  seconds: number;
  onTimeout: () => void;
};

const Timer: FC<TimerProps> = ({ seconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const intervalRef = useRef<any>({});

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  return <p>Your login session will expire in {timeLeft} second(s).</p>;
};

export default Timer;
