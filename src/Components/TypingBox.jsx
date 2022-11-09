import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {


    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const inputTextRef = useRef(null);

    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));
    console.log(wordSpanRef);
    // console.log(Array(5));
    //Array(4).fill(-1) => [{},{},{},{}]
    /* wordSpanRef = [
        {
            current: null
        },
        {
            current: null
        },
        ....
     ] */
    console.log(inputTextRef);

    const handleKeyDown = (e)=>{

        let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;
        
        //logic space




        //logic for backspace



        // logic for incorrect and correct characters
        if(e.key===allChildrenSpans[currCharIndex].innerText){
            console.log("user pressed the correct key");
            allChildrenSpans[currCharIndex].className='char correct';
            
        }
        else{
            console.log("user didn't press the correct key");
            allChildrenSpans[currCharIndex].className='char incorrect';
        }
        setCurrCharIndex(currCharIndex+1);
        

    }

    const focusInput = ()=>{
        inputTextRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
    },[])

  return (
    <div>
        <div className="type-box" onClick={focusInput}>
            <div className="words">
                {/* spans of words and chars */}
                {words.map((word,index)=>(
                    <span className='word' ref={wordSpanRef[index]}>
                        {word.split("").map((char,idx)=>(
                            <span className='char'>{char}</span>
                        ))}
                    </span>
                ))}
            </div>
        </div>

        <input
            type='text'
            className='hidden-input'
            ref={inputTextRef}
            onKeyDown={((e)=>handleKeyDown(e))}
        />
        
    </div>
  )
}

export default TypingBox