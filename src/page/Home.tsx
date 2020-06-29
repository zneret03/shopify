import React from 'react';
import LandingPage from '../components/Frontend/LandingPage';
import NewArival from '../components/Frontend/NewArival'
import Items from '../components/Frontend/Items';
import Category from '../components/Frontend/Category';
import CallToAction from '../components/Frontend/CallToAction';

const Home: React.SFC = () => {
    return(
        <div>
            <div className="font-mono">
            <LandingPage/>
            <div className="container mx-auto sm:px-10 px-5">
                <NewArival />
                <Items /> 
                <Category /> 
            </div>
            <CallToAction />
            </div>
        </div>
    )
}

export default Home;