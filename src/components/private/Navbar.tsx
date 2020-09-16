import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'react-feather';
import {signOut} from './Sidebar';
const Navbar:React.SFC = () => {

    const [responsive, setResponsive] = useState<boolean>(false);

    useEffect(() => {
        const navbarResize = () => {
            if(window.innerWidth > 472){
                setResponsive(true);
            }else{
                setResponsive(false);
            }
        }
        navbarResize();
        window.addEventListener('resize', navbarResize);
        return() => window.removeEventListener('resize', navbarResize);
    },[])

    const [toggleProduct, setToggleProduct] = useState<boolean>(false);

    const toggle = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(toggleProduct !== true){
            setToggleProduct(true);
        }else{
            setToggleProduct(false);
        }
    }


    const [menu, setMenu] = useState<boolean>(false);

    const toggleManu = (event : React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
        event.preventDefault();
        if(menu !== true){
            setMenu(true);
        }else{
            setMenu(false);
        }
    }

    return(
        <div>
            <div className="w-full bg-black">
                <div className="shadow">
                    <div className="container mx-auto px-3 py-4">
                        {responsive ? (
                             <div className="flex items-center justify-end">
                             <Link to="/dashboard" className="text-gray-700">
                                 <span className="mr-5 cursor-pointer text-white">Home</span>
                            </Link>
                             <Link to="/inventory" className="text-gray-700">
                                 <span className="mr-5 cursor-pointer text-white">Inventory</span>
                            </Link>
                            <Link to="/order" className="text-gray-700">
                                <span className="mr-5 cursor-pointer text-white">Orders</span>
                            </Link>
                             <div>
                                 <span className="mr-5 cursor-pointe text-white" onClick={(event) => toggle(event)}>Product</span>
                                 <ul className={`${toggleProduct ? 'block' : 'hidden'} shadow absolute bg-gray-900 px-4 py-3 mt-3`}>
                                     <Link to="/dashboard/products/addProducts" className="text-gray-700">
                                         <li className="mb-2 cursor-pointer text-white">Add Products</li>
                                     </Link>
                                     <Link to="/dashboard/products/viewProducts" className="text-gray-700">
                                         <li className="cursor-pointer text-white">View Products</li>
                                     </Link>
                                 </ul>
                             </div>
                             <span className="mr-5 cursor-pointer text-white">Settings</span>
                             <span className="mr-5 cursor-pointer text-white" onClick={signOut}>Logout </span>
                         </div>
                        ) : (
                            <div>                                                                                                     
                                <span className="cursor-pointer" onClick={(event) => toggleManu(event)}><Menu className="ml-2" color="#FFF"/></span>
                                <div className={`${menu ? 'block' : 'hidden'}`}>
                                <Link to="/dashboard" className="text-gray-700">
                                    <span className="mr-5 cursor-pointer block mt-1 hover:bg-gray-900 rounded py-1 px-2 text-white">Home</span>
                                </Link>
                                    <span className="mr-5 cursor-pointer block mt-1 hover:bg-gray-900 rounded py-1 px-2 text-white">Inventory</span>
                                    <span className="mr-5 cursor-pointer block mt-1 hover:bg-gray-900 rounded py-1 px-2 text-white">Orders</span>
                                    <div>
                                        <span className="mr-5 cursor-pointer mt-1 block hover:bg-gray-900 rounded py-1 px-2 text-white" onClick={(event) => toggle(event)}>Product</span>
                                        <ul className={`${toggleProduct ? 'block' : 'hidden'} shadow absolute bg-gray-900 px-4 py-3 mt-3`}>
                                            <Link to="/dashboard/products/addProducts" className="text-gray-700">
                                                <li className="mb-2 cursor-pointer text-white">Add Products</li>
                                            </Link>
                                            <Link to="/dashboard/products/viewProducts" className="text-gray-700">
                                                <li className="cursor-pointer text-white">View Products</li>
                                            </Link>
                                        </ul>
                                    </div>
                                    <span className="mr-5 cursor-pointer block mt-1 hover:bg-gray-900 rounded py-1 px-2 text-white">Settings</span>
                                    <span className="mr-5 cursor-pointer block mt-1 hover:bg-gray-900 rounded py-1 px-2 text-white">Logout </span>
                                    </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;