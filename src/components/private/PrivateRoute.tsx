import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../../auth/AuthProvider';

interface Props {
    component: React.FC,
    path : string,
    exact? : boolean
}

const PrivateRoute:React.FC<Props> = ({component : RouteComponent, ...path}) => {

    const {authenticated} : any = useContext(AuthContext)
    console.log(!!authenticated.isAuthenticated);
    return(
        <Route 
        {...path}
        render={(routeProps : any) => 
        authenticated.isAuthenticated ? (
            <RouteComponent {...routeProps}/>
        ) : (
            <Redirect to={"/"}/>
        )}
        />
    )
}

export default PrivateRoute;