import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";


const AlertContext = createContext();


export const AlertContextProvider = ({children})=>{

    const [alert, setAlert] = useState({
        open: false,
        type: '',
        message: ''
    });

    const values = {
        alert,
        setAlert
    }

    return (<AlertContext.Provider value={values}>{children}</AlertContext.Provider>);
}

export const useAlert = ()=> useContext(AlertContext);