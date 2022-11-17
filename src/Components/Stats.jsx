import React from 'react'
import Graph from './Graph'

const Stats = ({wpm,accuracy,graphData,correctChars,incorrectChars,extraChars, missedChars}) => {

  var timeSet = new Set(); //set only stores unique values 
  const newGraph = graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  });

  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats