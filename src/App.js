import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { auth } from "./firebaseConfig";
import { GlobalStyles } from "./Styles/global";

function App() {

  const {theme} = useTheme();
  console.log(auth);
  return (

    <ThemeProvider theme={theme}>
      <div className="canvas">

        <GlobalStyles/>
        <Header/>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>

    
  );
}

export default App;
