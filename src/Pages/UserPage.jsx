import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Graph from '../Components/Graph'
import { useTheme } from '../Context/ThemeContext'
import { db, auth } from '../firebaseConfig'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from '@material-ui/core'

const UserPage = () => {
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [dataLoading, setDataLoading] = useState(true);
    const {theme} = useTheme();
    console.log("theme",theme);

    const fetchUserData = () => {
        const resultRef = db.collection('Results');
        let tempData = [];
        let tempGraphData = [];
        console.log(auth.currentUser);
        const {uid} = auth.currentUser;
        resultRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp,doc.data().wpm]);
            });
            setData(tempData);
            setGraphData(tempGraphData.reverse());
            setDataLoading(false);
        });
    }

    useEffect(()=>{
        if(!loading){
            fetchUserData();
        }
    },[loading]);


    if(loading || dataLoading){
        return (
            <div className="centre-of-screen">
                <CircularProgress size={200} color={theme.title}/>
            </div>
        );
            
    }


  return (
    <div className="canvas">

        <div className="user-profile">  
            <div className="user">
                <div className="picture">
                    <AccountCircleIcon style={{display:'block', transform:'scale(6)', margin:'auto', marginTop: '3.5rem'}} />
                </div>
                <div className="info" >
                    <div className="email"
                     style={{width:'auto'}}
                     >
                       

                        {user.email}
                    
                      
                        
                    </div>
                    <div className="joined-on">
                        {user.metadata.creationTime}
                    </div>
                
                </div>
            </div>

            <div className="total-times">
                <span>
                    Total Test Taken - {data.length}
                </span>
            </div>
        
        </div>


        <div className="result-graph">
            <Graph graphData={graphData} type='date'/>
        </div>
        
        <div className="table">
            <TableContainer style={{maxHeight:'30rem'}}>
                <Table>
                    <TableHead> 
                        <TableRow>  
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                WPM
                            </TableCell>
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                Accuracy
                            </TableCell>
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                Characters
                            </TableCell>
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(i=>(
                            <TableRow>
                                <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                    {i.wpm}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                    {i.characters}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                    {i.timeStamp.toDate().toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default UserPage



// fetch all the result data from firestore
// put all of it in an array
// make a Map, (mapping will be from uid to result object)
// loop over the array and check if the uid is present in map, if it is present then check that result.wpm<i.wpm, change the result object
 