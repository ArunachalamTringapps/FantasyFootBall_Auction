import './App.css'
import { Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"

function App() {
  return (
    <div className="App">

      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
