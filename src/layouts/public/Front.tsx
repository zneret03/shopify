import React from 'react';
import Navbar from '../../components/Frontend/Navbar'
import CalltoAction from '../../components/Frontend/CallToAction';
import Footer from '../../components/Frontend/Footer';
interface Props {
    children : React.ReactNode
}
const Front:React.SFC<Props> = ({children}) => {
    return(
        <React.Fragment>
            <Navbar />
            {children}
            <CalltoAction />
            <Footer />
        </React.Fragment>
    )
}

export default Front;