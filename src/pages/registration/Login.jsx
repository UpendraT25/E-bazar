/* eslint-disable react/no-unescaped-entities */
import { createContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import authservice from "../../appwrite/Auth";
import Loader from "../../components/loader/Loader";

const Login = () => {
    const [loading,setLoading]=useState(false);
    const [UserLogin,setUserLogin]=useState({
        email:"",
        password:""
    });
    const navigate=useNavigate();
    const event=async()=>{
        if(UserLogin.email==""||UserLogin.password==""){
            toast.error("All the fields are required")
            return ;
        }
        setLoading(true);
        const data=await authservice.Login(UserLogin)
        // console.log(b);

        if(data){
            const data2=await authservice.getCurrentUser();
            // console.log(data2);
            await localStorage.setItem('user',JSON.stringify({"name":data2.name,"email":data2.email,"Role":data2.labels[0]}));
            setLoading(false);
            toast.success("Login succesfully")
            if(data2.labels[0]=="user"){
                navigate('/user-dashboard')
            }
            else{
                 navigate('/admin-dashboard');
            }
        }
        else{
            setUserLogin({
                email:"",
                password:""
            })
            setLoading(false);
            toast.error("Input current name and password");
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            {loading&&<Loader/>}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                        value={UserLogin.email}
                        onChange={(e)=>setUserLogin({
                            ...UserLogin,
                            email:e.target.value
                        })}
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                        value={UserLogin.password}
                        onChange={(e)=>setUserLogin({
                            ...UserLogin,
                            password:e.target.value
                        })}
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        onClick={event}
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;