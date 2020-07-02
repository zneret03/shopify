import React from 'react';
import {auth} from '../config/firebase';

const Dashboard:React.FC = () => {

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