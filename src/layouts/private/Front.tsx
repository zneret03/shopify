import React from 'react';
import Sidebar from '../../components/private/Sidebar'

interface Props {
    children : React.ReactNode
}

const Front:React.SFC<Props> = ({children}) => {

    return(
        <React.Fragment>
        <div className="font-sans flex">
            <Sidebar />
            {children}
        </div>
        </React.Fragment>
    );
}

export default Front;