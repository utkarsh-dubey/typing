import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
import { auth, db } from '../firebaseConfig';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Graph from './Graph'

const Stats = ({wpm,accuracy,graphData,correctChars,incorrectChars,extraChars, missedChars, resetTest}) => {

  const [user] = useAuthState(auth);
  const {setAlert} = useAlert();
  var timeSet = new Set(); //set only stores unique values 
  const newGraph = graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushResultsToDB = async()=>{
    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    if(!isNaN(accuracy)){
        //push results  to db
        await resultsRef.add({
            userId: uid,
            wpm: wpm,
            accuracy: accuracy,
            characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
            timeStamp: new Date()
        }).then((res)=>{
          setAlert({
            open: true,
            type: 'success',
            message: 'result saved to db'
          });
        });
    }
    else{
      setAlert({
        open: true,
        type: 'error',
        message: 'invalid test'
      });
    }


  }

  useEffect(()=>{
    if(user){
      pushResultsToDB();
    }
    else{
      setAlert({
        open: true,
        type: 'warning',
        message: 'login to save results!'
      });
    }
  },[]);


  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="stats">
              <div className="title">WPM</div>
              <div className="subtitle">{wpm}</div>
              <div className="title">Accuracy</div>
              <div className="subtitle">{accuracy}%</div>
              <div className="title">Characters</div>
              <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            </div>


            <RestartAltIcon onClick={resetTest} className='reset-btn'/>
            


        </div>
        <div className="right-stats">
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats