import Cookies from "js-cookie";
import React from "react";
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/authContext";

const ProfileScreen = () => {
    const history = useHistory();
    const { isAuthenticated, toggleAuth } = useAuth();

    const logoutMethod = () => {
        Cookies.remove("token");
        Cookies.remove("avatar");
        history.push("/home/all");
        toggleAuth(false);
    }

    return (
        <div>
            <h1>You are in Profile screen.</h1>
            <button onClick={logoutMethod}> Log out </button>
        </div>
    )
}

export default ProfileScreen