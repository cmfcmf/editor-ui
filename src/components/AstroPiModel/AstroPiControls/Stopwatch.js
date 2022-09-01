import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import './Stopwatch.scss'
import Sk from 'skulpt'

const Stopwatch = () => {
  const codeRunTriggered = useSelector((state) => state.editor.codeRunTriggered)
  const {
    seconds,
    minutes,
    isRunning,
    pause,
    reset
  } = useStopwatch({ autoStart: false })

  useEffect(() => {
    if (codeRunTriggered && !isRunning) {
      reset()
    }
    if (!codeRunTriggered && isRunning){
      pause()
      Sk.sense_hat.mz_criteria.duration = minutes * 60 + seconds
    }
  }, [codeRunTriggered, minutes, seconds, isRunning, pause, reset])


  return (
    <div className='astro-pi-stopwatch-container'>
      <label className='sense-hat-controls__control-name' htmlFor='astro_pi_stopwatch'>Timer</label>
      <span className='astro-pi-stopwatch' id='astro_pi_stopwatch'>
        <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
      </span>
    </div>
  )
}

export default Stopwatch
