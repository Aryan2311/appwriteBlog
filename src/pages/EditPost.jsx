import React,{useEffect,useState} from 'react'
import appwriteServices from '../appwrite/config';
import { useNavigate,useParams } from 'react-router-dom' ;
import { Container ,PostForm } from '../components';
// this shows the difference between passing prop as a destructured object in case of AllPost and passing it as object in EditPost !! i.e. in PostCard and PostForm components

function EditPost() {
  const[post,setPost] = useState(null);
  const navigate = useNavigate();
  const {slug} = useParams() ;
  useEffect(()=>{
    if(slug){
        appwriteServices
        .getPost(slug)
        .then(post => {
            if(post){
                setPost(post)
            }
            else{
                navigate('/')
            }
        })
        .catch(err => console.log("editPost page error :",err))
    }
  },[slug,navigate])

  return (
    post ? (<div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>) : null
  )
}

export default EditPost