import React from 'react';
import {Facebook, Twitter, Chrome, X} from 'react-feather';
import {Divider} from 'antd';

interface Props {
    close : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const Login:React.FC<Props> = ({close}) => {
    return(
    <div className="font-mono">
        <div>
        <div className="absolute w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="shadow rounded md:max-w-sm max-w-xs w-full bg-white overflow-hidden">
            <div className="p-2">
                <span className="float-right cursor-pointer"><X onClick={close}/></span>
            </div>
            <div className="py-2 px-5">
                <div className="py-5">
                    <div className="text-center">
                        <span className="font-bold text-gray-500 text-sm font-sans">Sign in with</span>
                        <ul className="flex justify-center mt-3">
                            <li className="mr-3 py-1 px-1 rounded hover:bg-blue-800 bg-blue-700 cursor-pointer"><Facebook color="#FFF"/></li>
                            <li className="mr-3 py-1 px-1 rounded hover:bg-blue-700 bg-blue-500 cursor-pointer"><Twitter color="#FFF"/></li>
                            <li className="mr-3 py-1 px-1 rounded hover:bg-red-700 bg-red-500 cursor-pointer"><Chrome color="#FFF"/></li>
                        </ul>
                    </div>
                    <Divider />
                    <div className="text-center text-gray-500 mb-5">
                        <span className="font-bold text-sm font-sans">or sign in with</span>
                    </div>
                    <form action="">
                        <div className="mb-4">
                            <input className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" id="email" placeholder="example@yahoo.com"/>
                        </div>
                        <div>
                            <input className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" type="password" placeholder="Password"/>
                        </div>
                        <div className="text-center mt-5">
                            <button className="py-2 w-full bg-gray-800 rounded text-white hover:bg-gray-500">Sign In</button>
                            <div className="mt-3">
                                <span className="cursor-pointer hover:text-blue-500 hover:underline">Create account</span>
                            </div>
                            <Divider />
                            <div>
                                <span className="text-sm hover:text-red-500 hover:underline cursor-pointer">Forgotten your password?</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
            </div>
        </div>
        </div>
    </div>

    )
}

export default Login;