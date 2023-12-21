import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Logo,Input,Button} from './index';
import {useNavigate,Link} from 'react-router-dom';
import authService from '../appwrite/authentication';
import { logIn as storeLogin } from '../features/authentication/authSlice';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState("");
  const {register,handleSubmit} = useForm();
  

  const submitHandler = async (data) => {
    // setError('');
    // authService.logIn(data)
    // .then((data) => {
    //   dispatch(storeLogin(data))
    //   navigate("/");
    // })
    // .catch(err=> setError(err.message));

    setError('');
    
    try {
      const session = await authService.logIn(data);
      if(session){
        const userData = await authService.getCurrentUser();
        if(userData){
          dispatch(storeLogin(userData));
        navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  

  }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
    <div className='space-y-5'>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
        placeholder='Email' 
        labelText='Email: '
        type='email'  
        {...register("email",{
          required:true,
          validate:{
            pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address"
          }
        })}/>
        <Input 
        placeholder='password' 
        labelText='Password: ' 
        type='password' 
        {...register("password",{
          required:true
        })}/>  
        <Button
        type="submit"
        className="w-full"
        >Sign in</Button> 
      </form></div>
     {error && ( <p className='text-red-600 mt-8 text-center '>{error}</p>)}
    </div>
    </div>
  )
}

export default Login