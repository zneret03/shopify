import React, { ComponentType } from 'react';
import {Route} from 'react-router-dom';
import Front from './Front'

interface Props {
    component : ComponentType<any>,
    path? : String,
    exact: boolean
}

const PublicRoute:React.SFC<Props> = ({component: Component, ...path}) => {
    return(
        <Route {...path} render={(props : any) => (
            <Front>
                <Component {...props}/>   
            </Front>                                                                 
        )}/>
    )
}

export default PublicRoute;