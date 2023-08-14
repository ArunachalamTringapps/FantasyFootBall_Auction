import React, { useState,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../css/Dashboardcss/UserEdit.css"
import image from '../../Image/no-profile-img.gif';
const UserEdit = () => {
    const navigate = useNavigate()
    const useref=useRef();
    const email = localStorage.getItem("useremail")
    const [newPassword, setnewpassword] = useState('')
    const [newUsername, setnewusername] = useState('')
    const [newPhoneno,setnewphoneno]=useState('');
    const[Image,setnewimage]=useState('');
    // const handleclickedit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.put(`http://localhost:5000/api/settings/editdetails/${email}`, {
    //             new_password: newPassword,
    //             new_username: newUsername
    //         })
    //         navigate('/user/dashboard/setting');
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    //     e.target.reset();
    // }
    const [updateduserdetails, setupdateduserdetails] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:5000/api/userdetails/${email}`)
      .then((response) => {
        setupdateduserdetails(response.data)
        console.log("upadted user", updateduserdetails)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
  }, [])
    const handleclickedit = async(e) =>{
        const formdata=new FormData();
        formdata.append('newPassword',newPassword);
        formdata.append('newUsername',newUsername);
        formdata.append('newPhoneno',newPhoneno);
        formdata.append('Image',Image);
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/settings/editdetails/${email}`,formdata)
            navigate('/user/dashboard/setting');
        }
        catch (err) {
            console.log(err.message);
        }
        e.target.reset();
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
                        <input type="password"  placeholder="********"  onChange={(e) => setnewpassword(e.target.value)} />
                        <label className='input-label'>Username</label>
                        <input type="text" value={updateduserdetails.username} onChange={(e) => setnewusername(e.target.value)} />
                        <label className='input-label'>Phone Number</label>
                        <input type="text"  value={updateduserdetails.phone_no ? updateduserdetails.phone_no : 'phone number is null'} onChange={(e) =>setnewphoneno(e.target.value)} />
                        <button className='update-bt'type="submit">Update Settings</button>
                        </div>
                </form>
            </div>
    )
}

export default UserEdit
