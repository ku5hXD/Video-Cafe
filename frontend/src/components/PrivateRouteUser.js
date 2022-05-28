import React from "react"
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import ProfileScreen from "./ProfileScreen";
import { useEffect,useState } from "react";
import Cookies from "js-cookie";


const PrivateRouteUser = () => {
    
    const { isAuthenticated,toggleAuth } = useAuth();
    const [loggedIn,setLoggedIn] = useState(false);
    const [loading,setLoading] = useState(false);

    var user;

    const readCookie = async () => {
        user = Cookies.get("token");
        setLoading(true);
        if(user)
        {
            console.log(user);
            setLoggedIn(true);
           await toggleAuth(true);
        }
    }

    useEffect(() => {
        readCookie();
    },[])

 

    // console.log(user);

    // return (loggedIn ? <Redirect to="/upload" /> : <Redirect to="/login" />);

   if(loading)
   {
    return (loggedIn ? <ProfileScreen/> : <Redirect to="/login" />);
   }
   else 
   {
       console.log("in div")

       return (
           <div>
            <h1> wait some time </h1>
           </div>
       )
   }

    

}

export default PrivateRouteUser;