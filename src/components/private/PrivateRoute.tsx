import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../../auth/AuthProvider';

interface Props {
    component: React.SFC,
    path : string
}

const PrivateRoute:React.SFC<Props> = ({component : Component, ...path}) => {

    const currentUser = React.useContext(AuthContext)

    return(
        <Route 
        {...path}
        render={(routeProps : any) => 
        !!currentUser ? (
            <Component {...routeProps}/>
        ) : (
            <Redirect to="/"/>
        )}
        />
    )
}

export default PrivateRoute;