import React from 'react';
import {X} from 'react-feather';
interface Props {
    children : React.ReactNode,
    close? : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const Modal:React.FC<Props> = ({children, close}) => {
    return(
        <div className="absolute w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="shadow rounded md:max-w-sm max-w-xs w-full bg-white overflow-hidden">
                <div className="p-2">
                    <span className="float-right cursor-pointer"><X onClick={close}/></span>
                </div>
            <div className="py-2 px-5">
                <div className="py-5">
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Modal;