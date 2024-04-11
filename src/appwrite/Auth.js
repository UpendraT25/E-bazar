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
}

const authservice=new AuthService();
export default authservice;