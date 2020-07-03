import React, {useState, useEffect} from 'react';
import {Search, ShoppingCart, User, Menu} from 'react-feather'
import {Link} from 'react-router-dom';
import {Badge} from 'antd'

import SearchItem from './SearchItem';
import Login from '../Forms/Login';
const Navbar: React.SFC = () => {

    //** open login modal
    const [login, setLogin] = useState(false);

    const openLogin = (event: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(login !== true) return setLogin(true);
    }

    const closeLogin = (event: React.MouseEvent<SVGAElement, MouseEvent>) => {
        event.preventDefault();
        if(login === true) return setLogin(false);
    }

    // ** show hamburger icon when resizing window
    const [Hamburger, setHamburger] = useState(false);

    const hamburger = () => {
        if(window.innerWidth < 650) {
            setHamburger(true);
        }else{
            setHamburger(false);
        }
    }

    // ** Toggle Menu in small size window
    const [toggle, setToggle] = useState(false);

    const openToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(toggle !== true) return setToggle(true)
        if(toggle === true) return setToggle(false);
    }

    //** open search menu
    const [showSearch, setShowSearch] = useState(false);

    const openSearch = (event: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        if(showSearch !== true) return setShowSearch(true)
    }

    //** close search menu
    const closeSearch = (event:  React.MouseEvent<SVGElement, MouseEvent>) =>{
        event.preventDefault();
        if(showSearch === true) return setShowSearch(false);
    }

    //** event listener when resizing the window
    useEffect(() => {
        hamburger();
        window.addEventListener('resize', hamburger);
        return () => window.removeEventListener('resize', hamburger);
    }, [])
    
    const theme = '#000'
    
    return(
        <div className="shadow sticky top-0 bg-white z-20">
        {showSearch && <SearchItem close={(event) => closeSearch(event)}/>}
        {login && <Login close={(event : any) => closeLogin(event)} />}
         <div className="text-black">
           <div className="container mx-auto px-5">
               <div className="flex items-center justify-between">
                   {Hamburger ? (
                       <>
                            <button onClick={(event) => openToggle(event)}><Menu size="25"/></button>
                            <svg width="74" className="w-16 h-16 cursor-pointer mx-auto" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.2556 29.309V11.2236L21.501 0V15.7669C4.8846 20.0425 8.05067 24.1737 10.5994 25.9404L0 30.6524L17.277 38.3381L34.7797 30.6524L17.277 22.9727L10.9527 25.7849C8.2387 22.39 16.5029 18.3306 21.501 16.2699V18.3134L36.2556 29.309Z" fill="black"/>
                                <path d="M53.3999 42.6885L38.6454 31.6917V49.7762L45.0973 54.6847C43.9564 59.3211 37.5094 55.8395 32.8624 52.5939L36.5699 49.7762V31.6917L21.8153 42.6885V61L32.1664 53.1269C43.669 64.0448 45.0526 57.127 45.2045 54.7631L53.4005 61L53.3999 42.6885Z" fill="black"/>
                                <path d="M58.5833 23.8894C62.5062 6.94446 55.4866 9.62743 53.0847 10.9597V0.0010376L38.3297 11.224V29.3087L53.0847 18.3098V11.1047C58.2909 9.28395 58.4201 18.2472 58.0517 23.6553L56.4987 22.9731L39.2216 30.6534L56.4987 38.3391L74 30.6534L58.5833 23.8894Z" fill="black"/>
                            </svg>

                       </>
                   ): (
                    <>
                        <svg width="74" className="w-16 h-16 cursor-pointer" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.2556 29.309V11.2236L21.501 0V15.7669C4.8846 20.0425 8.05067 24.1737 10.5994 25.9404L0 30.6524L17.277 38.3381L34.7797 30.6524L17.277 22.9727L10.9527 25.7849C8.2387 22.39 16.5029 18.3306 21.501 16.2699V18.3134L36.2556 29.309Z" fill="black"/>
                            <path d="M53.3999 42.6885L38.6454 31.6917V49.7762L45.0973 54.6847C43.9564 59.3211 37.5094 55.8395 32.8624 52.5939L36.5699 49.7762V31.6917L21.8153 42.6885V61L32.1664 53.1269C43.669 64.0448 45.0526 57.127 45.2045 54.7631L53.4005 61L53.3999 42.6885Z" fill="black"/>
                            <path d="M58.5833 23.8894C62.5062 6.94446 55.4866 9.62743 53.0847 10.9597V0.0010376L38.3297 11.224V29.3087L53.0847 18.3098V11.1047C58.2909 9.28395 58.4201 18.2472 58.0517 23.6553L56.4987 22.9731L39.2216 30.6534L56.4987 38.3391L74 30.6534L58.5833 23.8894Z" fill="black"/>
                        </svg>
                        <div className="font-mono sm:font-bold cursor-pointer py-1 text-lg sm:flex tracking-widest">
                            <Link to="/" 
                            style={{color: theme}} 
                            className="sm:mr-10 mr-5 border-b border-black">
                                HOME
                            </Link>
                            <Link to="/mens" 
                            style={{color: theme}} 
                            className="sm:mr-10 mr-5 border-b border-white hover:border-black">
                                MENS
                            </Link>
                            <Link to="womens" 
                            style={{color: theme}} 
                            className="sm:mr-10 mr-5 border-b border-white hover:border-black">
                                WOMEN
                            </Link>
                            <Link to="/kids" 
                            style={{color: theme}} 
                            className="sm:mr-10 mr-5 border-b border-white hover:border-black">
                                KIDS
                            </Link>
                        </div>
                    </>
                   )}
                    <div className="flex cursor-pointer block">
                        <span className="mr-5 md:block hidden">
                            <Search className="hover:text-gray-600"  
                            onClick={(event) => openSearch(event)}/>
                        </span>
                            <span className="mr-5 md:block hidden">
                            <User className="hover:text-gray-600" 
                            onClick={(event) => openLogin(event)}/></span>
                        <Badge count={5}>
                            <span><ShoppingCart  className="hover:text-gray-600" /></span>
                        </Badge>
                    </div>
                </div>
           </div>
           <div className={`${toggle ? 'block' : 'hidden'} font-mono text-lg sm:font-bold sm:hidden block cursor-pointer px-2 py-1 tracking-wider`}>
                <Link to="/" className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200 rounded-xs hover:text-black text-black">HOME</Link>
                <Link to="/mens" className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200 hover:text-black text-black">MEN</Link>
                <Link to="/womens" className="sm:mr-10 px-3 mr-5 block mt-1 hover:bg-gray-200 hover:text-black text-black">WOMEN</Link>
                <Link to="/kids" className="block px-3 mt-1 hover:bg-gray-200 hover:text-black text-black">KIDS</Link>
                <span onClick={(event) => openLogin(event)} className="block px-3 mt-1 hover:bg-gray-200 hover:text-black text-black">LOGIN</span>
                <span onClick={(event) => openSearch(event)} className="block px-3 mt-1 hover:bg-gray-200 hover:text-black text-black">SEARCH</span>
            </div>
            </div>
        </div>  
    )
}

export default Navbar;