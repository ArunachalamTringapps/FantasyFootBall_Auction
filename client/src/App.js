import './App.css'
import { Navigate, Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"
// import Cursor from "react-cursor-follow";
// import { BiFootball } from "react-icons/bi";
import Admin from './components/Dashboard/Admin';
import Loading from './loading/LoadingPage'
import ErrorPage from './errorpage/ErrorPageComponents'
import PrivateRoute from './components/PrivateRouting/PrivateRoute';
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';

function App() {
  localStorage.setItem("authentication","false");
  return (
    <div  data-cursor-exclusion style={{backgroundColor: '#fff'}} data-cursor-size="30px"  className="App">
      <Cursor isGelly={true} />
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/user' element={<PrivateRoute />}>
        <Route path="dashboard" element={<Admin/>}></Route>
      </Route>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/error' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
