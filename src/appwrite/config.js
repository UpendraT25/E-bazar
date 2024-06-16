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
                    [],
                )
            }catch(error){
                console.log("not able to fetch data");
            }
        }

        async singledatafetch(id){
            try{
                return await this.databases.listDocuments(
                    conf.appwriteDBid,
                    conf.appwritecollectionid,
                    [Query.equal(`$id`,id)],
                )
                // console.log(a);
            }catch(error){
                console.log("not able to fetch data");
            }
        }
        async Updatedoc(id,{title,price,productImageUrl,category,description,quantity,time,date}){
            try{
                return await this.databases.updateDocument(
                    conf.appwriteDBid,
                    conf.appwritecollectionid,
                    id,
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
                console.log("not able to update data");
            }
        }

        async deletedoc(id){
            try{
                return await this.databases.deleteDocument(
                    conf.appwriteDBid,
                    conf.appwritecollectionid,
                    id
                );
            }catch(error){
                console.log("not deletable");
            }
        }
}

const service=new Service();
export default service