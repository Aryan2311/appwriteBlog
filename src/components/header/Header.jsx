import React from 'react';
import {useSelector} from 'react-redux';
import {LogoutBtn,Container,Logo} from "../index";
import {Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"login",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"Register",
      slug:"/register",
      active:!authStatus
    },
    {
      name:"All posts",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Add post",
      slug:"/add-post",
      active:authStatus
    }
  ]
  return (
    <header className='py-3 bg-gray-500 shadow'>
    <Container>
      <nav className='flex'>
        <div className='mr-4'>
         <Link to="/">
         <Logo width='70px'/>
         </Link>
         <ul className='flex ml-auto'>
           {
            navItems.map((item)=>{
                if(item.active){
                  return(<li key={item.name}>
                            <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=>{
                              // navigate(`/${item.slug}`)
                               navigate(item.slug)
                              console.log('btn clicked')
                              console.log(item.slug)
                              }}>{item.name}</button>                   
                          </li>)
                }
                else{
                   return null ;
                }
            })
           }

           {authStatus && (
              <li key={'logout'}>
                <LogoutBtn />
              </li>
           )}
         </ul>
        </div>
      </nav>
    </Container>
    </header>
  )
}

export default Header