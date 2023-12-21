import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Logo,Input,Button} from './index';
import {useNavigate,Link} from 'react-router-dom';
import authService from '../appwrite/authentication';
import { logIn as storeLogin } from '../features/authentication/authSlice';

function Register() {
    const dispatch = useDispatch();
    const [error,setError] = useState('');
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate() ;

    const submitHandler = async (data) =>{
        setError('');
        try {
             const userData = await authService.createAccount(data) ;
             if(userData){
                dispatch(storeLogin(userData));
                navigate("/");
        }
        } catch (error) {
            setError(error.message);
        }
       
    } 
  return (
    <div>
     <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">Register your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign in
                    </Link>
        </p>
        <div className='space-y-5'>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input 
        placeholder = 'name'
        labelText = 'Name: '
        {...register("name",{
            required:true
        })}
        />
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

export default Register;