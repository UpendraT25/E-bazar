import {Client,Account,ID} from "appwrite"
import conf from "../conf/conf";

export class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteprojid)
        this.account=new Account(this.client);
    }

    async CreateAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return true;
            }else {
                return false;
            }
        }catch(error){
            throw error;
        }
    }

    async Login({email,password}){
        try{
        const userlogin=await this.account.createEmailSession(email,password);
        if(userlogin){
            console.log(userlogin);
            return userlogin;
        }else {
            return userlogin;
        }
    }catch(error){
        console.log("login detail not found");
    }
    return null;
    }

    async getCurrentUser(){
        try{
            return this.account.get();
        }catch(error){
            console.log("user information not found");
        }
        return null;
    }
}

const authservice=new AuthService();
export default authservice;