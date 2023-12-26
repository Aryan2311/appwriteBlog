import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../features/authentication/authSlice'
import authService from '../../appwrite/authentication'
import {useNavigate} from 'react-router-dom';

function LogoutBtn() {
  const navigate = useNavigate() ;
  const dispatch = useDispatch();
  const logoutHandler = () => {
        authService.logOut()
        .then(
            () => { dispatch(logOut()) })
        .catch((err)=>console.log(err))
        .finally(()=> {
            let date = new Date();
            console.log(`logged out at : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on : ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
            navigate('/login')          
          })
          
  }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'>Logout</button>
  )
}

export default LogoutBtn