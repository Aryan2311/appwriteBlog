import React,{useCallback,useEffect} from 'react' ;
import {useNavigate} from 'react-router-dom' ;
import {useSelector} from 'react-redux' ;
import {Input,RTE,Select,Button} from '../index';
import {useForm} from 'react-hook-form';
import appwriteServices from '../../appwrite/config';

function PostForm({post}) {
  const navigate = useNavigate();
  const {register,handleSubmit,watch,control,setValue} = useForm({
    defaultValues:{
         title:post?.title || "",
         slug:post?.slug || "",
         content:post?.content || "",
         status : post?.status || "",
    }
  });
  const userData = useSelector(state=>state.auth.userData);
  const submitHandler = async (data) => {
    if(post){
        const file = data.image[0]? await appwriteServices.uploadFile(data.image[0]) :null;
        if(file){
            await appwriteServices.deleteFile(post.FeaturedImg);
            const updatedPost = await appwriteServices.updatePost(post.$id,{
                ...data,
                featuredImg : file ? file.$id : undefined
            })
            if(updatedPost){
                navigate(`/post/${updatedPost.$id}`)
            }
        }
       
    }
    else{
        const file = data.image[0] ? await appwriteServices.uploadFile(data.image[0]) : null ;
        if(file)
        {
            const newPost = await appwriteServices.createPost({
                ...data,
                userId:userData.$id,
                featuredImg : file ? file.$id : undefined
            })
            
        if(newPost){
            navigate(`/post/${newPost.$id}`)
        }
        }
    }
        
  }
  const slugTransform = useCallback((value) => {
       if(value && typeof value === 'string'){
        return value
        .trim()
        .toLowerCase
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
       }
       return "";
  },[])
  useEffect(()=>{
    const subscription = watch((value,{name,type})=>{
        if(name === 'title'){
            setValue('slug',slugTransform(value.title),{
                shouldValidate:true
            })
        }
    });
    
    return () => {
        subscription.unsubscribe();
    }

  },[watch,slugTransform,setValue])


  return (
    <div>PostForm</div>
  )
}

export default PostForm