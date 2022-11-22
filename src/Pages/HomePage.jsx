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
      <div className="canvas">
        <Header/>
        <TypingBox/>
        <Footer/>
      </div>
  )
}

export default HomePage