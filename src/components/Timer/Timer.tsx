import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  seconds: number
  onTimeout: () => void
}

const Timer: FC<Props> = ({ seconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000) as unknown as undefined

    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current)
      onTimeout()
    }
  }, [timeLeft, onTimeout])

  return <p>Your login session will expire in {timeLeft} second(s).</p>
}

export default Timer
