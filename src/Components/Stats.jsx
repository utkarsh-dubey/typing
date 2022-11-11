import React from 'react'

const Stats = ({wpm,accuracy}) => {
  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">30/2/3/3</div>
        </div>
        <div className="right-stats">
            //graph will go here
        </div>
    </div>
  )
}

export default Stats