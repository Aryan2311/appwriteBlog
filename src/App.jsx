import React from 'react' ;
import {useDispatch} from "react-redux";
import { logIn,logOut } from './features/authentication/authSlice';
import authService from './appwrite/authentication';
import toast, { Toaster } from 'react-hot-toast';
import {Header,Footer} from './components/index.js';
import {Outlet} from 'react-router-dom' ;
import ReactLoading from 'react-loading';

function App() {
  const [loading,setLoading] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(()=>{
       authService.getCurrentUser()
       .then((userData) => {
              if(userData){
                  dispatch(logIn({userData:userData}));
              }
              else{
                dispatch(logOut());
              }
       }) 
       .catch(err => toast.error("user not found"))
       .finally(()=>setLoading(false))
  },[])


  return (
    <>
    <Toaster />
    {!loading ? (
      <>
      <Header />
      <Outlet />
      <Footer />
      </>
    )   
    
    :
    <ReactLoading type="spin" color="#fff" />
    }

    </>
  )
}

export default App
