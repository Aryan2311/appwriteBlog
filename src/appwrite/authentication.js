import {Client,Account,ID} from "appwrite" ;
import conf from "../conf/conf";

console.log(conf)

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteEndPoint)
        .setProject(conf.appWriteProjectId) ;
        this.account = new Account(this.client) ;
    }

    async createAccount({name,email,password}){
          try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                 return this.logIn({email,password});
            }
            else{
                return userAccount
            }
          } catch (error) {
            console.log("appwrite services register user error :",error)
          }
    }
    async logIn({email,password}){
          try {
            return await this.account.createEmailSession(email,password)
          } catch (error) {
            console.log("appwrite services login error issue :",error);
          }
    }
    async getCurrentUser(){
          try {
            return await this.account.get() ;
          } catch (error) {
            console.log("appwrite services getCurrentUser error issue :",error);
            return false ;
          }
    }
        
    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service error : delete session related :" , error);
        }
    }
}

const authService = new AuthService();

export default authService ;

