import './App.css'
import { Navigate, Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRouting/PrivateRoute';
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';
import { useState } from 'react';

function App() {
  const [email_id,setEmail_id]=useState('');
  const isAuthenticated=localStorage.getItem("authentication");
  if(!isAuthenticated){
  localStorage.setItem("authentication","false");
  }
  return (
    <div  style={{backgroundColor: '#fff'}} data-cursor-size="30px"  className="App">
      <Cursor isGelly={true} />
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path="/login"  element={<Login email_id={email_id} setEmail_id={setEmail_id}/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/user' element={<PrivateRoute />}>
        <Route path="dashboard/*"  element={<Dashboard email_id={email_id} />}></Route>
        
        </Route>

      </Routes>
    </div>
  );
}

export default App;
