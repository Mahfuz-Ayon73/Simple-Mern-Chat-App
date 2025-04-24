import { use, useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogIn = () => {
    const [loading , setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async(username,password) => {

        const success = handleInputError(username,password);

        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login",{
                method : "POST",
                headers : {
                    "content-Type" : "application/json",
                },
                body : JSON.stringify({username,password})
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));

            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading,login};
}

export default useLogIn

function handleInputError(username,password){

    if(!username || !password){
        toast.error("Please fill in all fields");
        return false;
    }

    return true;  
}