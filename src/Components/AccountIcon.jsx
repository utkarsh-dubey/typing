import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

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
    const classes = useStyles();
  return (
    <div>
        <AccountCircleIcon onClick={()=>setOpen(true)}/>

        <Modal 
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.box}>
            <AppBar
            position='static'>
                <Tabs
                    value={value}
                    onChange = {handleValueChange}
                    variant='fullWidth'
                >
                    <Tab label='login'></Tab>
                    <Tab label='signup'></Tab>
                </Tabs>
            </AppBar>

            {value===0 && <h1>login component</h1>}
            {value===1 && <h1>sign up component</h1>}
            </div>
            

            

        </Modal>
    </div>
  )
}

export default AccountIcon