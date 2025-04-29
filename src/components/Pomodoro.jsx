import React, { useEffect, useState } from 'react'

const getInitialTime = (mode) => {
    return mode === 'work' ? 25 * 60 : 5 * 60;
  };

export default function Pomodoro() {
const [timeLeft, setTimeLeft] = useState(getInitialTime('work'));
const [isRunning, setIsRunning] = useState(false);
const [mode, setMode] = useState('work'); // 'work' or 'break'

function playAlarm() {
    const sound = new Audio("/alarm.mp3");
    sound.play();
}

useEffect(() => {
    let timer = null;
    
    if(isRunning && timeLeft > 0){
        timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
    }

    return () => clearInterval(timer);
}, [isRunning, timeLeft]);


useEffect(() => {
    if (timeLeft === 0) {
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(getInitialTime('break'));
        playAlarm();
      } else {
        setMode('work');
        setTimeLeft(getInitialTime('work'));
        playAlarm();
      }
  
      setIsRunning(true);
    }
  }, [timeLeft, mode]);
  

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
    setTimeLeft(getInitialTime('work'));
}

  return (
    <div>
      <h1 className='title'>Pomodoro Timer</h1>
      <h2 className='mode-title'>{mode === 'work' ? 'Focus Time' : 'Break Time'}</h2>
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
