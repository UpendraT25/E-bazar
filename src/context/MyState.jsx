import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import service from "../appwrite/config";
import toast from 'react-hot-toast';

function MyState({children}){
    const user=JSON.parse(localStorage.getItem('user'));
    const email=user?.email;
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
    
    // get all order
    const [getAllOrder,setGetAllOrder]=useState([]);

    // Order function
    const getAllOrderFunction=async()=>{
        setLoading(true);
        try{
            const b=await service.orderProducts(email);
            // console.log(a.documents);
            setGetAllOrder(b.documents);
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    // delelte order
    const deleteProduct=async($id)=>{
        try{
            await service.deleteOrder($id);
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    // get all user
    const [getAllUser,setGetAllUser]=useState([]);

    

    useEffect(()=>{
        getAllProductsFunction();
        getAllOrderFunction(email);
    },[])
    return (
        <MyContext.Provider value={{loading,
            setLoading,
            getAllProducts,
            getAllProductsFunction,
            getAllOrderFunction,
            getAllOrder,
            deleteProduct
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState