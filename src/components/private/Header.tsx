import React from 'react';
import {Divider} from 'antd'

interface Props {
    children : React.ReactNode,
    pageName : string
}

const Header:React.SFC<Props> = ({children, pageName}) => {
    return(
        <div className="container mx-auto sm:px-1 px-8 lg:pl-64 py-6">
        <div className="flex sm:items-center sm:justify-between sm:flex-row flex-col">
            <span className="font-bold text-2xl">{pageName}</span>
            <span className="text-xl font-segoe-UI">Welcome to Shopify</span>
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