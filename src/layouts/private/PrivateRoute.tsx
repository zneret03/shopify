import React, {useContext, ComponentType} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../../auth/AuthProvider';
import Front from './Front';
/* <Route 
{...path}
render={(routeProps : any) => 
!!isAuthenticated ? (
    <RouteComponent {...routeProps}/>
) : (
    <Redirect to={"/"}/>
)}
/> */

interface Props {
    component: ComponentType<any>,
    path : string,
    exact? : boolean
}

const PrivateRoute:React.SFC<Props> = ({component : RouteComponent, path}) => {

    const isAuthenticated : any = useContext(AuthContext)
    
    const routeComponent = (props : any) => {
        return isAuthenticated ? 
        <Front>
            {React.createElement(RouteComponent, props)} 
        </Front> 
        : <Redirect to="/"/>  
    }
    
    return <Route {...path} render={routeComponent}/>
}

export default PrivateRoute;