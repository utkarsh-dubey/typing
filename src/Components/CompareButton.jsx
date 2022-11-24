import { Button, makeStyles, Modal, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import { auth, db } from '../firebaseConfig';


const useStyles = makeStyles(()=>({
    modal: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    compareBox: {
        width: 'auto',
        padding: '1rem',
        border: '1px solid'
    }
}));

const CompareButton = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const {setAlert} = useAlert();
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const handleModal = ()=>{
        if(user){
            setOpen(true);
        }
        else{
            setAlert({
                open: true,
                type: 'warning',
                message: 'login to compare'
            })
        }
        
    }

    const handleClose = ()=>{
        setOpen(false);
    }


    const checkUserNameAvailability = async()=>{
        const ref = db.collection('usernames').doc(`${username}`);
        const response = await ref.get();
        if(response.exists){
            if(user.uid === response.data().uid){
                return false;
            }
        }
        return response.exists;
    }

    const handleSubmit = async()=>{

        if(await checkUserNameAvailability()){
            navigate(`/compare/${username}`);
        }
        else{
            setAlert({
                open:true,
                type:'warning',
                message:'invalid username'
            })
        }
    }

    const classes = useStyles();
    const {theme} = useTheme();

  return (
    <div>
        <div className="compare-btn" 
        style={{
            cursor:'pointer', 
            color:theme.background, 
            background: theme.title , 
            padding:'0.3rem', 
            borderRadius:'5px', 
            marginTop:'-5px' 
        }}
        onClick={handleModal}>
            COMPARE
        </div>
        <Modal 
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >

            <div className={classes.compareBox}>
                <TextField 
                    type='text'
                    label='Enter username'
                    variant='outlined'
                    InputLabelProps={
                        {
                            style:{
                                color: theme.title
                            }
                        }
                    }
                    InputProps={{
                        style:{
                            color: theme.title
                        }
                    }}
                    onChange={(e)=>setUsername(e.target.value)}/>
                <Button 
                    style={{backgroundColor:theme.title, color: theme.background, marginLeft:'5px', marginTop:'10px'}}
                    onClick={handleSubmit}>   
                    Compare
                </Button>
            </div>

        </Modal>
        
    </div>
  )
}

export default CompareButton