import React from 'react';
import {Route} from 'react-router-dom';
import Front from '../public/Front'

interface Props {
    component : React.FC,
    path? : String,
}

const HomeLayout:React.SFC<Props> = ({component: Component, ...path}) => {
    return(
        <Route exact {...path} render={(props : any) => (
            <Front>
                <Component {...props}/>   
            </Front>                                                                 
        )}/>
    )
}

export default HomeLayout;