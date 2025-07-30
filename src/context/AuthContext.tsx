import {createContext, useContext } from 'react';
import React from "react";
import userInfo from '../assets/scripts/userInfo.ts';

// Your authentication context is a container that holds all the values you want for authentication 

type AuthTools = {
   
    storedUserInfo: string | null;
    setUserInfo: (username: string) => void;
}

type Props = {children: React.ReactNode}

const AuthContext = createContext<AuthTools|undefined>(undefined);

export function AuthProvider({children}: Props){


    const  {storedUserInfo, setUserInfo} = userInfo();

    return (
        // Pass the values to the AuthContext provider
        <AuthContext value={{ storedUserInfo, setUserInfo }}>
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