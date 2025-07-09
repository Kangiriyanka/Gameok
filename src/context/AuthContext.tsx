import {createContext, useContext } from 'react';
import React from "react";
import useToken from '../assets/scripts/useToken.ts';
import userInfo from '../assets/scripts/userInfo.ts';

// Your authentication context is a container that holds all the values you want for authentication 
// If you're not logged in, the token will be null.
type AuthTools = {
   
    token: string | null;
    removeToken: () => void;
    setToken: (token: string) => void;
    storedUserInfo: string | null;
    setUserInfo: (username: string) => void;
}

type Props = {children: React.ReactNode}

const AuthContext = createContext<AuthTools|undefined>(undefined);

export function AuthProvider({children}: Props){

    const {token, removeToken, setToken } = useToken();
    const  {storedUserInfo, setUserInfo} = userInfo();

    return (
        // Pass the values to the AuthContext provider
        <AuthContext value={{ token, removeToken, setToken, storedUserInfo, setUserInfo }}>
            {children}
        </AuthContext>
    );
}


// You can also do: const authContext= useContext(AuthContext);
export function useAuthContext() {
    const authTools = useContext(AuthContext);
    if (authTools === undefined) {
        throw new Error("useAuthContext must be used within an AuthContext");
    }

    return authTools;

}