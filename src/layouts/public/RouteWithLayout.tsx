import React from 'react';
import {Route} from 'react-router-dom';
import Front from './Front'

interface Props {
    component : React.FC,
    path? : String,
}

const RouteWithLayout:React.SFC<Props> = ({component: Component, ...path}) => {
    return(
        <Route exact {...path} render={(props : any) => (
            <Front>
                <Component {...props}/>   
            </Front>                                                                 
        )}/>
    )
}

export default RouteWithLayout;