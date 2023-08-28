import React, { useState,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../css/Dashboardcss/UserEdit.css"
import image from '../../Image/no-profile-img.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserEdit = ({defaultusername,defaultphonenumber}) => {
  // console.log("default phone no",defaultphonenumber)
    const navigate = useNavigate()
    const useref=useRef();
    const email = localStorage.getItem("useremail")
    const [newPassword, setnewpassword] = useState('')
    const [newUsername, setnewusername] = useState('')
    const [newPhoneno,setnewphoneno]=useState('');
    const[Image,setnewimage]=useState(null);
    const [updateduserdetails, setupdateduserdetails] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:5000/api/userdetails/${email}`)
      .then((response) => {
        setupdateduserdetails(response.data)
        // setnewusername(updateduserdetails.username)
        console.log("upadted user", updateduserdetails)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
  }, [])

    const LogOut = () => {
        localStorage.setItem("authentication", "false");
        localStorage.setItem("useremail", "")
        navigate("/login")
    }
    const handleclickedit = async(e) =>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('newPassword',newPassword);
        formdata.append('newUsername',newUsername);
        formdata.append('newPhoneno',newPhoneno);
        formdata.append('Image',Image);
        try {
            await axios.put(`http://localhost:5000/api/settings/editdetails/${email}`,formdata)
            // toast.success('user edit sucess');
            // setnewimage(null);
            navigate('/user/dashboard');
        }
        catch (err) {
            console.log(err.message);
            toast.error('An error occurred during updating user');
        }
        // e.target.reset();
    }
    const handleClickImage = () =>{
        useref.current.click();
    }
    const handleImage = (e) => {
        setnewimage(e.target.files[0]);
    }
    return (
        <div className='user-edit-container'>
                <h1 className='edit-title'>UserEditSettings</h1>
                <form className='user-details' onSubmit={handleclickedit} autoComplete='off'>
                        {/* <div className='updateimage'></div> */}
                        <div onClick={handleClickImage} className='imageContainer'>
                           {/* <img src='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png' className='updateimage' /> */}
                           {Image ? <img src={URL.createObjectURL(Image)} className='updateimage' /> :(<img src={image} className='updateimage' />)}
                           <input className='Imagefield' ref={useref} type='file' onChange={handleImage}/>
                        </div>
                        <div className='update-details'>
                        <label className='input-label'>Password</label>
                        <input type="password"  placeholder="********" onChange={(e) => setnewpassword(e.target.value)} />
                        <label className='input-label'>Username</label>
                        <input type="text"   defaultValue={defaultusername} onChange={(e) => setnewusername(e.target.value)} />
                        <label className='input-label'>Phone Number</label>
                        <input type="text"  defaultValue={defaultphonenumber} onChange={(e) =>setnewphoneno(e.target.value)} />
                        <button className='update-bt'type="submit">Update Settings</button>
                        </div>
                </form>
                <button className='log-button' onClick={LogOut}>Log Out</button>
                <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
            </div>
    )
}

export default UserEdit
