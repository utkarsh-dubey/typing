import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 400
    }
}))


const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleValueChange = (e,v)=>{
        setValue(v);
    }
    const handleClose = ()=>{
        setOpen(false);
    }

    const navigate = useNavigate();

    const logout = ()=>{
        auth.signOut().then((ok)=>{
            alert("Logged out");
        }).catch((err)=>{
            alert("Not able to logout");
        });
    }  
    const [user] = useAuthState(auth);

    const handleAccountIconClick = ()=>{

        if(user){
            navigate('/user');
        }
        else{
            setOpen(true);
        }

    }

    const classes = useStyles();
    
    console.log(user);

  return (
    <div>
        <AccountCircleIcon onClick={handleAccountIconClick}/>
        {(user)&&<LogoutIcon onClick={logout} style={{marginLeft:'5px'}}/>}

        <Modal 
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.box}>
            <AppBar
                position='static'
                style={{backgroundColor:'transparent'}}>
                <Tabs
                    value={value}
                    onChange = {handleValueChange}
                    variant='fullWidth'
                >
                    <Tab label='login' style={{color:'white'}}></Tab>
                    <Tab label='signup' style={{color:'white'}}></Tab>
                </Tabs>
            </AppBar>

            {value===0 && <LoginForm handleClose={handleClose}/>}
            {value===1 && <SignupForm handleClose={handleClose}/>}
            </div>
            

            

        </Modal>
    </div>
  )
}

export default AccountIcon