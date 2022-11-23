import React from 'react'
import { useTestMode } from '../Context/TestMode'

const UpperMenu = ({countDown, currWordIndex}) => {

    const {setTestTime,testMode,setTestMode, setTestWords,testWords} = useTestMode();

    const updateTime = (e) =>{
        setTestTime(e.target.id);
    }

    const updateWords = (e) =>{
        setTestWords(Number(e.target.id));
    }

    const setMode = (e) =>{
        setTestMode(e.target.id);
    }

  return (
    <div className="upper-menu">
        <div className="counter">
            {(testMode==='time')?countDown:`${currWordIndex}/${testWords}`}
        </div>
        
        <div className="modes">
            <span className="mode" id='time' onClick={(e)=>setMode(e)} style={{paddingRight:'10px'}}>Time</span>
            <span className="mode" id='words' onClick={(e)=>setMode(e)}>Words</span>
        </div>

        {testMode==='time'?(
            <div className="time-modes">
                <div className="time" id={15} onClick={(e)=>updateTime(e)}>15s</div>
                <div className="time" id={30} onClick={(e)=>updateTime(e)}>30s</div>
                <div className="time" id={60} onClick={(e)=>updateTime(e)}>60s</div>
            </div>
        ):(
            <div className="word-mode">
                <div className="no-of-words" id={10} onClick={(e)=>updateWords(e)}>10</div>
                <div className="no-of-words" id={20} onClick={(e)=>updateWords(e)}>20</div>
                <div className="no-of-words" id={30} onClick={(e)=>updateWords(e)}>30</div>
            </div>
        )}
        
    </div>
  )
}

export default UpperMenu