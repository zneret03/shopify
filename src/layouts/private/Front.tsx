import React from 'react';
import Navbar from '../../components/private/Navbar'

interface Props {
    children : React.ReactNode
}

const Front:React.SFC<Props> = ({children}) => {
    return(
        <div className="font-mono ">
            <Navbar />
            {children}
        </div>
    );
}

export default Front;