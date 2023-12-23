import React from 'react'
import appwriteServices from '../appwrite/config'
import { Container } from '../components';
function AllPost() {
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
        {
            posts.map((post,index)=>{
                <PostCard key={index} />
            })
        }
        </Container>
    </div>
  )
}

export default AllPost