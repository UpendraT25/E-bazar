import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import service from "../appwrite/config";

function MyState({children}){
    const [getAllProducts,setGetAllproducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const getAllProductsFunction=async()=>{
        setLoading(true);
        try{
            const a=await service.productdetails([]);
            // console.log(a.documents);
            setGetAllproducts(a.documents);
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        getAllProductsFunction();
    },[])
    return (
        <MyContext.Provider value={{loading,
            setLoading,
            getAllProducts,
            getAllProductsFunction
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState