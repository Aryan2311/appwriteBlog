import React,{useEffect,useState} from 'react';
import { Container,PostCard } from '../components';
import appwriteServices from '../appwrite/config';
import {useNavigate} from 'react-router-dom' ;

function Home() {
  const navigate = useNavigate();
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
     appwriteServices
     .getPosts()
     .then((posts)=>{
           if(posts){
              setPosts(posts.documents)
              console.log(posts.documents)
           }
           else{
              console.log('cant fetch posts')
           }
     })
     .catch((err) => console.log(err))
  },[])
     
  if(posts.length == 0 ){
    return (
        <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
    )
  }
  return (
    <div className='w-full py-8'>
        <Container>
        <div className='flex flex-wrap'>
          {
            posts? posts.map(post => (
                <div className='w-1/4 p-2' key={post.$id} onClick={()=>{
                    navigate(`/post/${post.$id}`)
                    }}>
                   <PostCard {...post} />
                </div>
            )) :<div>No Posts</div>
          }
        </div>
        </Container>
    </div>
  )
}

export default Home