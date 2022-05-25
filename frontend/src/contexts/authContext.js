import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthContextProvider(props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleAuth = (value) => {
        setIsAuthenticated(value);
    };

    return <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>{props.children}</AuthContext.Provider>;
}
