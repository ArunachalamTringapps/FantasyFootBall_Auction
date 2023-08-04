import './App.css'
import { Route,Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login&Registration/Login"
import Register from "./components/Login&Registration/Registration"
// import Cursor from "react-cursor-follow";
// import { BiFootball } from "react-icons/bi";
import Admin from './components/Dashboard/Admin';
import Loading from './loading/LoadingPage'
import ErrorPage from './errorpage/ErrorPageComponents'
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';

function App() {
  return (
    <div  data-cursor-exclusion style={{backgroundColor: '#fff'}} data-cursor-size="30px"  className="App">
      {/* <div className='cursor'><Cursor color="rgba(240, 248, 255, 0);" duration={0.8} size={40}><BiFootball></BiFootball></Cursor> */}
      {/* </div>       */}
      <Cursor isGelly={true} />
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
