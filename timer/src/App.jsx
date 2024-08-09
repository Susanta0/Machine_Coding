import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [count, setCount] = useState(300);
  const [isActive, setIsActive] = useState(true);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerId;
    if (count > 0 && isActive) {
      timerId = setInterval(() => {
        setCount((pre) => pre - 1);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [isActive, count]);

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const handleSetTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setCount(totalSeconds);
    setIsActive(true);
  };

  const formatTime = () => {
    const mins = Math.floor(count / 60);
    const secs = count % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div>
        <p>
          Count decreasing : <strong>{formatTime()}</strong>
        </p>
        <div>
          <input 
            type="number" 
            value={minutes} 
            onChange={handleMinutesChange} 
            placeholder="MM" 
            min="0"
          />
          <span>:</span>
          <input 
            type="number" 
            value={seconds} 
            onChange={handleSecondsChange} 
            placeholder="SS" 
            min="0"
            max="59"
          />
          <button onClick={handleSetTimer}>Set Timer</button>
        </div>
        <div>
          <button onClick={() => setCount(parseInt(minutes) * 60 + parseInt(seconds))}>Reset</button>
          <button onClick={() => setIsActive(false)}>Pause</button>
          <button onClick={() => setIsActive(true)}>Resume</button>
        </div>
      </div>
    </>
  )
}

export default App
