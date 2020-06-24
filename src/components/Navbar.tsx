import React, {useState, useEffect} from 'react';
import {Search, ShoppingCart, User, Menu} from 'react-feather'
import {Badge} from 'antd'

const Navbar: React.FC = () => {

    const [Hamburger, setHamburger] = useState(false);
    const [toggle, setToggle] = useState(false);

    const hamburger = () => {
        if(window.innerWidth < 650) {
            setHamburger(true);
        }else{
            setHamburger(false);
        }
    }

    const openToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(toggle !== true) return setToggle(true)
        if(toggle === true) return setToggle(false);
    }
    
    useEffect(() => {
        hamburger();
        window.addEventListener('resize', hamburger);
        return () => window.removeEventListener('resize', hamburger);
    }, [])

    return(
        <div className="w-screem shadow py-1">
         <div className="text-black">
           <div className="container mx-auto px-5">
               <div className="flex items-center justify-between">
                   {Hamburger ? (
                       <>
                            <button onClick={(event) => openToggle(event)}><Menu size="25"/></button>
                            <img className="w-16 h-16 cursor-pointer mx-auto" src={require('../image/Logo.svg')} alt=""/>
                       </>
                   ): (
                    <>
                        <img className="w-16 h-16 cursor-pointer" src={require('../image/Logo.svg')} alt=""/>
                        <div className={`font-mono sm:font-bold cursor-pointer py-1 sm:flex tracking-widest`}>
                            <span className="sm:mr-10 mr-5">HOME</span>
                            <span className="sm:mr-10 mr-5">MEN</span>
                            <span className="sm:mr-10 mr-5">WOMEN</span>
                            <span>KIDS</span>
                        </div>
                    </>
                   )}

                    <div className="flex cursor-pointer block">
                        <span className="mr-5 md:block hidden"><Search /></span>
                        <Badge count={5}>
                            <span><ShoppingCart /></span>
                        </Badge>
                        <span className="mx-5 md:block hidden"><User /></span>
                    </div>
                </div>
           </div>
           <div className={`${toggle ? 'block' : 'hidden'} font-mono sm:font-bold sm:hidden block cursor-pointer px-2 py-1 tracking-wider`}>
                <span className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200 rounded-xs">HOME</span>
                <span className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200">MEN</span>
                <span className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200">WOMEN</span>
                <span className="block px-3 mt-1 hover:bg-gray-200">KIDS</span>
            </div>
            </div>
        </div>  
    )
}

export default Navbar;