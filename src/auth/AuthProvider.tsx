import React, {createContext, useState, useEffect} from 'react';
import {auth} from '../config/firebase';

interface Props {
    children : React.ReactNode
}

const AuthContext = createContext({});

const AuthProvider:React.SFC<Props> = ({children}) => {

    const [authenticated, setAuthenticated] = useState<{user : string | null, isAuthenticated : boolean}>({user : null, isAuthenticated : false});
    
    const authlistener = () => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setAuthenticated({user : user.email, isAuthenticated : true});
            }else{
                setAuthenticated({user : null, isAuthenticated : false});
            }
        });
    }

    useEffect(() => {
        authlistener();
    }, [])

    return(
        <>
        {authenticated && (
            <AuthContext.Provider value={{authenticated}}>
            {children}
        </AuthContext.Provider>
        )}  
       </>                                                                                     
    )
}

export {AuthProvider, AuthContext};