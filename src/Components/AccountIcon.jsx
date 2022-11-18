import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';


const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center',
        border: '1px solid'
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

    const {theme} = useTheme();

    const handleAccountIconClick = ()=>{

        if(user){
            navigate('/user');
        }
        else{
            setOpen(true);
        }

    }

    const {setAlert} = useAlert();
    const googleProvider = new GoogleAuthProvider();


    const signInWithGoogle = ()=>{
        signInWithPopup(auth, googleProvider).then((res)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'Logged in'
            });
            handleClose();
        }).catch((err)=>{
            setAlert({
                open: true,
                type: 'error',
                message: 'not able to use google authentication'
            });
        });
    }



    const classes = useStyles();


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
                    <Tab label='login' style={{color:theme.title}}></Tab>
                    <Tab label='signup' style={{color:theme.title}}></Tab>
                </Tabs>
            </AppBar>
            
            {value===0 && <LoginForm handleClose={handleClose}/>}
            {value===1 && <SignupForm handleClose={handleClose}/>}

            <Box>
                <span style={{display:'block',padding:'1rem'}}>OR</span>
                <GoogleButton
                    style={{width:'100%'}}
                    onClick = {signInWithGoogle}
                />
            </Box>

            </div>
            

            

        </Modal>
    </div>
  )
}

export default AccountIcon