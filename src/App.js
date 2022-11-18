import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Alert from "./Components/Alert";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { auth } from "./firebaseConfig";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import { GlobalStyles } from "./Styles/global";

function App() {
  return (
    <>
    <Alert/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/user' element={<UserPage/>}></Route>
    </Routes>   
    </> 
  );
}

export default App;
