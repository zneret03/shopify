import React from 'react';
import {auth} from '../../config/firebase';

const Navbar:React.SFC = () =>{

    const signOut = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        auth.signOut();
    }

    return(
        <>
            <div className="w-full">
                <div className="shadow p-5">
                    <div className="flex justify-end items-center">
                        <button className="mr-3 cursor-pointer" onClick={(event) => signOut(event)}>Logout</button>
                        <span className="bg-gray-300 py-1 px-3 rounded">DrilonIan@yahoo.com</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;