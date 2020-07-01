import React, {createContext, useState, useEffect} from 'react';
import {auth} from '../config/firebase';

interface Props {
    children : React.ReactNode
}

const AuthContext = createContext({});

const AuthProvider:React.SFC<Props> = ({children}) => {

    const [authenticated, setAuthenticated] = useState<{user : string | null}>({user: ''});
    
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
            if(user !== null){
              setAuthenticated({
                  user : user.email,
              })
            }
        })
    }, [])

    return(
        <AuthContext.Provider value={{authenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext};