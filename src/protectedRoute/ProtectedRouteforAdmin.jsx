import { Navigate } from "react-router-dom";

export const ProtectedRouteforAdmin=({children})=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user?.Role=="admin"){
        return children
    }else {
        return <Navigate to={'/login'} />
    }
}