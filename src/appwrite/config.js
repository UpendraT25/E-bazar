import {Client,ID,Databases,Storage,Query} from "appwrite"
import conf from "../conf/conf";

export class Service{
    client=new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteprojid);
        this.databases=new Databases(this.client);
    }
    async AddDoc({title,price,productImageUrl,category,description,quantity,time,date}){
            try{
                return await this.databases.createDocument(
                    conf.appwriteDBid,
                    conf.appwritecollectionid,
                    ID.unique(),
                    {
                        title,
                        price,
                        productImageUrl,
                        category,
                        description,
                        quantity,
                        time,
                        date,
                    }
                )
            }catch(error){
                console.log("error in adding docs");
            }
        }

        async productdetails(){
            try{
                return await this.databases.listDocuments(
                    conf.appwriteDBid,
                    conf.appwritecollectionid,
                    []
                )
            }catch(error){
                console.log("not able to fetch data");
            }
        }
}

const service=new Service();
export default service