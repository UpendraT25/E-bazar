import {Client,Account,ID} from "appwrite"
export class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("660aa1a9b34abbc7f70b")
        this.account=new Account(this.client);
    }

    async CreateAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return userAccount;
            }else {
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async GetPreference(){
        try{
            const getpref=await this.account.getPrefs();
            if(getpref){
                return getpref
            }else{
                return getpref
            }
        }catch(error){
            throw error;
        }
    }
}

const authservice=new AuthService();
export default authservice;