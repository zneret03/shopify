import React from 'react';
import {auth} from '../../config/firebase';

const Dashboard:React.SFC = () => {

    const signOut = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        auth.signOut();
    }

    return(
        <>
             <button onClick={(event) => signOut(event)}>Logout</button>
        </>
    )
}

export default Dashboard;