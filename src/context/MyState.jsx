import { useState } from "react";
import MyContext from "./MyContext";

function MyState({children}){
    const name="Upendra Tripathi"
    const [loading ,setLoading]=useState("true")
    return (
        <MyContext.Provider value={loading}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState