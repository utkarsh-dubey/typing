import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/global";

function App() {
  return (
    <div className="canvas">

      <GlobalStyles/>
      <h1 style={{"textAlign":'center'}}>Typing Test</h1>
      <TypingBox/>
      <h1 style={{"textAlign":'center'}}>Footer</h1>
    </div>
  );
}

export default App;
