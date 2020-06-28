import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../../page/Home'

interface Props {
    component : React.FC,
    path : String
}

const HomeLayout:React.FC<Props> = ({component: Component, ...path}) => {
    return(
        <Route {...path} render={(props : any) => (
            <Home>
                <Component {...props}/>   
            </Home>                                                                 
        )}/>
    )
}

export default HomeLayout;