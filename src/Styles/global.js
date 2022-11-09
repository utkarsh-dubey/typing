import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`


*,
*::after,
*::before{
    box-sizing: border-box;
}
body{
    background: black;
    color: white;
    padding:0;
    margin:0;
    transition: all 0.25s linear;
}

.canvas{
    display: grid;
    grid-auto-flow:row;
    grid-template-row: auto 1fr auto;
    min-height: 100vh;
    gap:0.5rem;
    padding:1rem;
    width:100vw;
    align-items:center;
}

.type-box{
    display:block;
    max-width:1000px;
    height: 140px;
    position:relative;
    margin-left: auto;
    margin-right: auto;
    overflow:hidden;
}
.words{
    font-size:30px;
    display:flex;
    flex-wrap:wrap;
    align-content:center;
    width:100%;
}
.word{
    margin:5px;
    padding-right:2px;
}

.hidden-input{
    opacity:0
}

.correct{
    color:green;
}
.incorrect{
    color:red;
}



`;