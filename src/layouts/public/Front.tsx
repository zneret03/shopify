import React from 'react';
import Navbar from '../../components/Frontend/Navbar'
import Footer from '../../components/Frontend/Footer';
interface Props {
    children : React.ReactNode
}
const Front:React.FC<Props> = ({children}) => {
    return(
        <React.Fragment>
            <Navbar />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Front;