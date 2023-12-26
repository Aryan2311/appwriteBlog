import React from 'react'
import appwriteServices from '../appwrite/config'
import { Container, PostCard } from '../components';
import { useNavigate } from "react-router-dom";
// this shows the difference between passing prop as a destructured object in case of AllPost and passing it as object in EditPost !! i.e. in PostCard and PostForm components

function AllPost() {
  const navigate = useNavigate();
  const [posts,setPosts] = React.useState([]);
  React.useEffect(()=>{
    appwriteServices
    .getPosts([])
    .then(posts => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='w-full py-8'>
        <Container>
        <div className='flex flex-wrap'>
          {
            posts.map((post)=>
                 (<>
                 <div key={post.$id} className='p-2 w-1/4' onClick={()=>{
                     navigate(`/post/${post.slug}`)
                 }}>
                  <PostCard {...post}/>
                 </div>
                 </>)
            )
          }
          </div>
        </Container>
    </div>
  )
}

export default AllPost