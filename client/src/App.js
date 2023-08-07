import './App.css'
import { Navigate, Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"
// import Cursor from "react-cursor-follow";
// import { BiFootball } from "react-icons/bi";
import Dashboard from './components/Dashboard/Dashboard';
import Loading from './loading/LoadingPage'
import ErrorPage from './errorpage/ErrorPageComponents'
import PrivateRoute from './components/PrivateRouting/PrivateRoute';
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';

function App() {
  const isAuthenticated=localStorage.getItem("authentication");
  if(!isAuthenticated){
  localStorage.setItem("authentication","false");
  }
  return (
    <div  style={{backgroundColor: '#fff'}} data-cursor-size="30px"  className="App">
      {/* <Cursor isGelly={true} /> */}
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/user' element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard/>}></Route>
      </Route>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/error' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
