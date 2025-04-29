import React, { useEffect, useState } from 'react'

const defaultTime = 1500;
export default function Pomodoro() {
const [timeLeft, setTimeLeft] = useState(defaultTime);
const [isRunning, setIsRunning] = useState(false);

useEffect(() => {
    let timer = null;
    
    if(isRunning && timeLeft > 0){
        timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
    }

    return () => clearInterval(timer);
}, [isRunning, timeLeft]);

const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// handlers
const stopTimer = () => {
    setIsRunning(prev => !prev);
}

const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(defaultTime);
}

  return (
    <div>
      <h1 className='title'>Pomodoro Timer</h1>
      <div className='time'>{formatTime(timeLeft)}</div>
      <div className='buttons'>
        <button className='pause' onClick={stopTimer}>
            {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className='reset' onClick={resetTimer}>
            Reset
        </button>
      </div>
    </div>
  )
}
