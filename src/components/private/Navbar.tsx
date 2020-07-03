import React from 'react';
import {auth} from '../../config/firebase';

const Navbar:React.SFC = () =>{

    const signOut = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        auth.signOut();
    }

    return(
        <>
            <div className="w-full">
                <div className="shadow p-5">
                    <button onClick={(event) => signOut(event)}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;