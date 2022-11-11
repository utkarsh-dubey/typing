import React from 'react'
import { useTestMode } from '../Context/TestMode'

const UpperMenu = ({countDown}) => {

    const {setTestTime} = useTestMode();

    const updateTime = (e) =>{
        setTestTime(e.target.id);
    }

  return (
    <div className="upper-menu">
        <div className="counter">
            {countDown}
        </div>

        <div className="time-modes">
            <div className="time" id={15} onClick={(e)=>updateTime(e)}>15s</div>
            <div className="time" id={30} onClick={(e)=>updateTime(e)}>30s</div>
            <div className="time" id={60} onClick={(e)=>updateTime(e)}>60s</div>
        </div>
    </div>
  )
}

export default UpperMenu