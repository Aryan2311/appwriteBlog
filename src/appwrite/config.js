import conf from "../conf/conf.js";
import {Client,Databases,Storage,Query,ID} from "appwrite" ;

export class Services{
    client = new Client();
    databases;
    storage; // or bucket 

    constructor(){
        this.client
        .setEndpoint(conf.appWriteEndPoint)
        .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
         try {
            return await this.databases.createDocument(conf.appWriteDataBaseId,conf.appWriteCollectionId,slug, {
                title,
                content,
                featuredImage ,
                status,
                userId               
            });
         } catch (error) {
            console.log("appwrite service error: create document :: ",error)
         }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId, slug,{
                title,
                content,
                featuredImage,
                status 
            })
        } catch (error) {
            console.log("appwrite service  error : update document :: ",error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appWriteDataBaseId,
             conf.appWriteCollectionId,
             slug);

             return true ;
        } catch (error) {
            console.log("appwrite service error : delete document :: " ,error)
            return false ;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug)
        } catch (error) {
            console.log("appwrite service error : getPost :: ",error);
            return false ;
        }
      
    }
    //check this
    async getPosts(){
        try {
            return await this.databases.listDocuments(conf.appWriteDataBaseId,
             conf.appWriteCollectionId,[
                Query.equal("status", "active")
             ]
            );            
        } catch (error) {
            console.log("appwrite service error : getPosts :: ",error);
            return false ;
        }
    }
 
    async uploadFile(file){
         try {
              return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
         } catch (error) {
            console.log("appwrite service error : uploadFile :: ",error);
         }
    }

  
    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(conf.appWriteBucketId, fileID);
            return true ;
        } catch (error) {
            console.log("appwrite service error : deleteFile :: ",error);
            return false 
        }
    }

    downloadFile(fileID){
        return this.storage.getFileDownload(conf.appWriteBucketId, fileID);
    }


    filePreview(fileID){
          return this.storage.getFilePreview(conf.appWriteBucketId, fileID);
    }
}

const services = new Services();

export default services ;