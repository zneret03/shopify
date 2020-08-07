import React from 'react';
import Navbar from '../../components/public/Navbar'
import CalltoAction from '../../components/public/CallToAction';
import Footer from '../../components/public/Footer';
import {CartProvider} from '../../Context/CartProvider';
interface Props {
    children : React.ReactNode
}
const Front:React.SFC<Props> = ({children}) => {
    return(
        <CartProvider>
            <React.Fragment>
                <Navbar />
                {children}
                <CalltoAction />
                <Footer />
            </React.Fragment>
        </CartProvider>
    )
}

export default Front;