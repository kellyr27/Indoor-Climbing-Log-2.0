import React, {createContext, useState, useEffect, useContext} from 'react'


const AuthContext = createContext()

const AuthProvider = ({children}) => {
   

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token ? true : false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export {
    AuthProvider,
    useAuthContext
}
