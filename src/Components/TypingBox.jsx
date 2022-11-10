import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {


    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [countDown, setCountDown] = useState(15);
    const [testStart, setTestStart] = useState(false);
    const [testOver, setTestOver] = useState(false);

    const inputTextRef = useRef(null);

    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));
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

    const startTimer = () =>{

        const intervalId = setInterval(timer, 1000);

        function timer(){
            setCountDown((prevCountDown)=>{
                if(prevCountDown===1){
                    clearInterval(intervalId);
                    setCountDown(0);
                    setTestOver(true);
                }
                else{
                    return prevCountDown-1;
                }
                
            });
        }
    }



    const handleKeyDown = (e)=>{

        if(!testStart){
            startTimer();
            setTestStart(true);
        }
        

        let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;
        
        //logic space
        if(e.keyCode===32){

            //removing the cursor from the word
            if(allChildrenSpans.length<=currCharIndex){
                //className = 'char correct right' , 'char incorrect right'
                allChildrenSpans[currCharIndex-1].classList.remove('right');
                // allChildrenSpans[currCharIndex-1].className = allChildrenSpans[currCharIndex-1].className.replace('right','')
            }
            else{
                allChildrenSpans[currCharIndex].className = allChildrenSpans[currCharIndex].className.replace('current','');
            }

            //add cursor to the next word
            wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';

            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);

            return;
        }

        //logic for backspace
        if(e.keyCode===8){

            if(currCharIndex!==0){

                if(currCharIndex===allChildrenSpans.length){
                    if(allChildrenSpans[currCharIndex-1].className.includes('extra')){
                        allChildrenSpans[currCharIndex-1].remove();
                        allChildrenSpans[currCharIndex-2].className+=' right';
                    }
                    else{
                        allChildrenSpans[currCharIndex-1].className = 'char current'
                    }
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }

                allChildrenSpans[currCharIndex].className = 'char';
                allChildrenSpans[currCharIndex-1].className = 'char current';
                setCurrCharIndex(currCharIndex-1);
            }
            

            return;
        }

        if(currCharIndex===allChildrenSpans.length){
            
            let newSpan = document.createElement('span'); // -> <span></span>
            newSpan.innerText = e.key;
            newSpan.className = 'char incorrect right extra';
            allChildrenSpans[currCharIndex-1].className = allChildrenSpans[currCharIndex-1].className.replace('right','');

            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            return;
        }


        // logic for incorrect and correct characters
        if(e.key===allChildrenSpans[currCharIndex].innerText){
            allChildrenSpans[currCharIndex].className='char correct';
            
        }
        else{
            allChildrenSpans[currCharIndex].className='char incorrect';
        }

        if(currCharIndex+1 === allChildrenSpans.length){
            allChildrenSpans[currCharIndex].className+=' right';
        }
        else{
            allChildrenSpans[currCharIndex+1].className = 'char current';
        }
        
        setCurrCharIndex(currCharIndex+1);
        

    }

    const focusInput = ()=>{
        inputTextRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    },[])

  return (
    <div>
        <h1>{countDown}</h1>
        {testOver?(<h1>Test Over</h1>):(
            <div className="type-box" onClick={focusInput}>
            <div className="words">
                {/* spans of words and chars */}
                {words.map((word,index)=>(
                    <span className='word' ref={wordSpanRef[index]} key={index}>
                        {word.split("").map((char,idx)=>(
                            <span className='char' key={`char${idx}`}>{char}</span>
                        ))}
                    </span>
                ))}
            </div>
            </div>
        )}
        

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