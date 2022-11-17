import React from 'react'
import { ThemeProvider } from 'styled-components'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import TypingBox from '../Components/TypingBox'
import { useTheme } from '../Context/ThemeContext'
import { GlobalStyles } from '../Styles/global'

const HomePage = () => {
    
    const {theme} = useTheme();
  
    return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles/>
        <Header/>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default HomePage