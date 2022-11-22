import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children})=>{

    const [testTime, setTestTime] = useState(15);
    const [testMode, setTestMode] = useState('time'); // time or words
    const [testWords, setTestWords] = useState(10);  // this means you will have to type 10 words

    const values = {
        testTime,
        testMode,
        testWords,
        setTestMode,
        setTestWords,
        setTestTime
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>);
}

export const useTestMode = () => useContext(TestModeContext);




/*

    <TestModeContextProvider>
        <component1/>
        <component2/>

    </TestModeContextProvider>




*/


