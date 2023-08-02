import './App.css'
import { Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <div className="App">

      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
