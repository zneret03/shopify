import React from 'react';
import {Divider} from 'antd'

interface Props {
    children : React.ReactNode,
    pageName : string,
    welcome : string
}

const Header:React.SFC<Props> = ({children, pageName, welcome}) => {
    return(
        <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
            <span className="font-bold text-2xl ">{pageName}</span>
            <span className="text-xl font-segoe-UI">{welcome}</span>
        </div>
        <Divider />
        <div>
            <div>
                {children}
            </div>
        </div>
    </div>
    )
}

export default Header;