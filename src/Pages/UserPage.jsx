import { CircularProgress, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Graph from '../Components/Graph'
import { db, auth } from '../firebaseConfig'

const UserPage = () => {
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [user, loading] = useAuthState(auth);

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
        });
    }

    useEffect(()=>{
        if(!loading){
            fetchUserData();
        }
    },[loading]);


    if(loading){
        return (<CircularProgress size={200}/>);
    }


  return (
    <div className="canvas">
        <Graph graphData={graphData} type='date'/>
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead> 
                        <TableRow>  
                            <TableCell>
                                WPM
                            </TableCell>
                            <TableCell>
                                Accuracy
                            </TableCell>
                            <TableCell>
                                Characters
                            </TableCell>
                            <TableCell>
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(i=>(
                            <TableRow>
                                <TableCell>
                                    {i.wpm}
                                </TableCell>
                                <TableCell>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell>
                                    {i.characters}
                                </TableCell>
                                <TableCell>
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