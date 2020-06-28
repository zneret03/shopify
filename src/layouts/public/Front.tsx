import React from 'react';
import Navbar from '../../components/Frontend/Navbar'
import LandingPage from '../../components/Frontend/LandingPage';
import NewArival from '../../components/Frontend/NewArival'
import Items from '../../components/Frontend/Items';
import Category from '../../components/Frontend/Category';
import CallToAction from '../../components/Frontend/CallToAction';
import Footer from '../../components/Frontend/Footer';
const Front:React.FC = () => {
    return(
        <React.Fragment>
            <Navbar />
            <LandingPage/>
            <div className="container mx-auto sm:px-10 px-5">
                <NewArival />
                <Items /> 
                <Category /> 
            </div>
            <CallToAction />
            <Footer />
        </React.Fragment>
    )
}

export default Front;