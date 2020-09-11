import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/private/Sidebar'
import Navbar from '../../components/private/Navbar';
import {OrderProvider} from '../../Context/OrderProvider';
interface Props {
    children : React.ReactNode
}

const Front:React.SFC<Props> = ({children}) => {


    const [navbar, setNavbar] = useState<boolean>(false);

    const showNavbar = () => {
        if(window.innerWidth > 734){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    useEffect(() => {
        showNavbar();
        window.addEventListener('resize', showNavbar);
        return () => window.removeEventListener('resize', showNavbar);
    },[])

    return(
        <OrderProvider>
            <React.Fragment>
            <div className={`font-sans ${navbar ? 'flex' : null} `}>
                {navbar ? <Sidebar /> : <Navbar />}
                {children}
            </div>
            </React.Fragment>
        </OrderProvider>
    );
}

export default Front;