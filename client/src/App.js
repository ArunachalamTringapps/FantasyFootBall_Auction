import './App.css'
import { Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"
import Cursor from "react-cursor-follow";
import { BiFootball } from "react-icons/bi";
import Admin from './components/Dashboard/Admin';
import Loading from './loading/LoadingPage'
import ErrorPage from './errorpage/ErrorPageComponents'

function App() {
  return (
    <div className="App">
      <div className='cursor'><Cursor color="rgba(240, 248, 255, 0);" duration={0.8} size={40}><BiFootball></BiFootball></Cursor>
      </div>      
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/dashboard" element={<Admin/>}></Route>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/error' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
