import React from 'react';
import Navbar from '../../components/Navbar'
import LandingPage from '../../components/LandingPage';
import NewArival from '../../components/NewArival'
import Items from '../../components/Items';
import Category from '../../components/Category';
const Front:React.FC = () => {
    return(
        <React.Fragment>
            <Navbar />
            <LandingPage/>
            <div className="sm:px-20 px-5">
                <NewArival />
                <Items /> 
                <Category /> 
            </div>
        </React.Fragment>
    )
}

export default Front;