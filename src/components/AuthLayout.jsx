import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function Protected({children,authentication = true}) {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    
// 4 cases -
// authentication = true ,if authStatus is true {children} is rendered and if authStatus is false user is redirected to homePage '/'
// authentication = false , if authStatus is true that is user is authenticated then he is sent to home page i.e. he shouldnt be at login page 
// if authStatus is false then he is children element is rendered


    useEffect(()=>{ 
       if(authentication && authStatus !==authentication) navigate('/login')
       else if(!authentication && authStatus !== authentication) navigate('/')
       setLoader(false);
    },[authStatus,authentication,navigate])
  return loader ? <h1>loading</h1>: <>{children}</>
}
