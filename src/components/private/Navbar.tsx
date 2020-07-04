import React, {useContext, useState} from 'react';
import {auth} from '../../config/firebase';
import { AuthContext } from '../../auth/AuthProvider'
import {
    Settings, 
    LogOut, 
    ShoppingBag, 
    Facebook, Twitter, 
    Instagram, 
    Home,
    Folder,
    ShoppingCart,
    Package} from 'react-feather';
import {Divider} from 'antd';
const Navbar:React.SFC = () =>{

    const currentUser : any = useContext(AuthContext);
    const data : object[] = []
    data.push(currentUser)

    const signOut = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        auth.signOut();
    }

    const [toggle, setToggle] = useState<boolean>(false);

    const Dropdown = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(toggle !== true){
             return setToggle(true);
        }else{
            return setToggle(false);
        }
    }
    return(
        <div className="font-sans">
                {/**Navbar */}
            <div className="shadow-lg max-w-xs bg-white h-screen overflow-auto">
                <div className="px-6">
                    <div>
                    <div className="pt-6 flex justify-center">
                        <img className="w-40 h-40 object-cover rounded-full" src={require('../../image/exampleProfile.jpg')} alt=""/>
                    </div>
                    {data.map((currentUser : any) => (
                        <div className="text-center mt-2">
                            <button className="rounded text-sm" onClick={(event) => Dropdown(event)} >
                                <span className="font-bold text-sm">Anika Zuckerberg</span>
                                <span className="text-sm text-gray-600 block">{currentUser.email}</span>
                            </button>
                        </div>
                        ))}

                        {/**Dropwdown */}
                        <ul className={`${toggle ? 'block' : 'hidden'} py-4 px-4 bg-gray-100 rounded absolute mx-auto shadow mt-1`}>
                            <li>
                                <div className="flex items-center">
                                    <span className="mr-2"><Settings size="18"/></span>
                                    <span className="block">Settings</span>
                                </div>
                            </li>
                            <li className="mt-2">
                                <div className="flex items-center">
                                    <span className="mr-2"><LogOut size="18"/></span>
                                    <span className="cursor-pointer" onClick={(event) => signOut(event)}>Logout</span>
                                </div>
                            </li> 
                        </ul>
                        <Divider />
                        <div className="font-bold">
                            <ul>
                                <li className="mb-5 hover:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer">
                                   <span className="mr-2"><Home size="18"/></span>
                                   <span>Home</span>
                                </li>
                                <li className="mb-5 hover:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><Folder size="18"/></span>
                                   <span>Inventory</span>
                                </li>
                                <li className="mb-5 hover:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><ShoppingCart size="18"/></span>
                                   <span>Orders</span>
                                </li>
                                <li className="mb-5 hover:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><Folder size="18"/></span>
                                   <span>Products</span>
                                </li>
                            </ul>
                        </div>
                        <Divider />
                        <div className="flex items-center  text-gray-600">
                            <span className="mr-2"><ShoppingBag size="19"/></span>
                            <span className="uppercase font-bold">sales channel</span>
                        </div>
                        <div className="mt-4 font-bold">
                            <ul>
                                <li className="mb-5 flex">
                                    <span>Facebook</span>
                                </li>
                                <li className="mb-5">Twitter</li>
                                <li className="mb-5">Instagram</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;