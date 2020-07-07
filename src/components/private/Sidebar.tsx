import React, {useContext, useState} from 'react';
import {auth, db} from '../../config/firebase';
import { AuthContext } from '../../auth/AuthProvider'
import {
    Settings, 
    LogOut,  
    Facebook, 
    Twitter, 
    Instagram, 
    Home,
    Folder,
    ShoppingCart,
    Package,
    ChevronDown,
    ChevronRight} from 'react-feather';
import {Divider} from 'antd';
import {Link} from 'react-router-dom';

const Navbar:React.SFC = () =>{

    const currentUser : any = useContext(AuthContext);
    const data : object[] = []
    data.push(currentUser)


    const signOut = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        auth.signOut();
    }

    const [menu, setMenu] = useState<boolean>(false);

    const Menu = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(menu !== true){
             return setMenu(true);
        }else{
            return setMenu(false);
        }
    }

    const [search, setSearch] = useState<boolean>(false);

    const searchChannel = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(search !== true){
             return setSearch(true);
        }else{
            return setSearch(false);
        }
    }

    const [name, setName] = useState([]);
    
    if(currentUser !== null){
        data.map(async(currentUser : any) => {
            const document = db.collection('user').doc(currentUser.uid);
            const uid = await document.get();
            const result = uid.data();
            const data: any = [];
    
            data.push(result);
    
            setName(data);
        });
    }
    else{
        return <div className="flex items-center justify-center">Loading...</div>
    }

    return(
            <div className="shadow-lg sm:w-1/4 md:w-1/2 lg:w-1/4 bg-white h-screen overflow-auto">
                <div className="px-6">
                    <div>
                    <div className="pt-6 flex justify-center">
                        <img className="w-32 h-32 object-cover rounded-full" src={require('../../image/exampleProfile.jpg')} alt=""/>
                    </div>
                    {name.map((data: any) => (
                        data ? (
                            <div  className="text-center mt-2">
                                <span className="font-bold text-lg">{`${data.firstname} ${data.lastname}`}</span>
                            </div>
                            ):(
                                <span className="hidden">
                                {
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000)
                                }
                                </span>
                            )
                    ))}
                    {data.map((currentUser : any) => (
                        <div className="text-center" key="currentUser">
                                <span className="text-sm text-gray-600 block">{currentUser.email}</span>
                        </div>
                        ))}
                        <Divider />
                        <div className={`${menu ? 'text-gray-600' : ''} flex items-center justify-between px-1 cursor-pointer`} 
                        onClick={(event) => Menu(event)}>
                                <span className="uppercase font-bold">Menu</span>
                                <span>{menu ? <ChevronDown size="18"/> : <ChevronRight size="18"/>}</span>
                        </div>
                        <div className={`${menu ? 'block' : 'hidden'} font-bold mt-4`}>
                            <ul>
                                <li className="mb-5 cursor-pointer">
                                   <Link to="/dashboard" 
                                   className="flex items-center rounded px-2 py-1 text-gray-700 hover:bg-gray-200 focus:bg-gray-200">
                                   <span className="mr-2"><Home size="18"/></span>
                                   <span>Home</span>
                                   </Link>
                                </li>
                                <li className="mb-5 hover:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer focus:bg-gray-200">
                                    <span className="mr-2"><Folder size="18"/></span>
                                   <span>Inventory</span>
                                </li>
                                <li className="mb-5 hover:bg-gray-200 focus:bg-gray-200 px-2 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><ShoppingCart size="18"/></span>
                                   <span>Orders</span>
                                </li>
                                <li className="mb-5 cursor-pointer">
                                   <Link to="/dashboard/products" 
                                   className="hover:bg-gray-200 focus:bg-gray-200 flex items-center px-2 rounded py-1 text-gray-700">
                                   <span className="mr-2"><Package size="18"/></span>
                                   <span>Products</span>
                                   </Link>
                                </li>
                            </ul>
                        </div>
                        <Divider />
                        <div className={`${search ? 'text-gray-600' : ''} mt-5 flex items-center justify-between px-1 cursor-pointer`} 
                        onClick={(event) => searchChannel(event)}>
                                <span className="uppercase font-bold">Sale Channel</span>
                                <span>{search ? <ChevronDown size="18"/> : <ChevronRight size="18"/>}</span>
                        </div>
                        <div className="mt-4 font-bold">
                            <ul className={`${search ? 'block' : 'hidden'}`}>
                                <li className="mb-5 hover:bg-gray-200 px-1 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><Facebook size="18"/></span>
                                    <span>Facebook</span>
                                    </li>
                                    <li className="mb-5 hover:bg-gray-200 px-1 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><Twitter size="18"/></span>
                                    <span>Twitter</span>
                                    </li>
                                    <li className="mb-5 hover:bg-gray-200 px-1 py-1 rounded flex items-center cursor-pointer">
                                    <span className="mr-2"><Instagram size="18"/></span>
                                    <span>Instagram</span>
                                    </li>
                            </ul>
                            <Divider />
                            <ul>
                            <li className="mb-5 px-1 py-1 rounded cursor-pointer">
                                    <div className="flex justify-between">
                                        <div className="flex items-center">
                                            <span className="mr-2"><Settings size="18"/></span>
                                            <span>Settings</span>
                                        </div>
                                        <span><ChevronRight size="18"/></span>
                                   </div>
                                </li>
                                <li onClick={(event) => signOut(event)} className="mb-5 hover:bg-gray-200 px-1 py-1 rounded flex items-center cursor-pointer">
                                   <span className="mr-2"><LogOut size="18"/></span>
                                   <span >Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Navbar;