import React from 'react';
import {ArrowLeftCircle} from 'react-feather';
import {Divider} from 'antd';
import {Link} from 'react-router-dom';

interface Props {
    back : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const SignUp:React.SFC<Props> = ({back}) => {
    return(
        <>
            <div>
                <ArrowLeftCircle className="cursor-pointer hover:text-red-500" onClick={back}/>
            </div>
            <div className="text-center mb-5">
                <span className="font-bold text-3xl">Sign up</span>
            </div>
            <form action="">
                <div className="mb-4">
                    <input type="text" className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" placeholder="Firstname"/>
                </div>
                <div className="mb-4">
                    <input type="text" className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" placeholder="Lastname"/>
                </div>
                <div className="mb-4"> 
                    <input type="email" className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" placeholder="Email"/>
                </div>
                <div>
                    <input type="password" className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" placeholder="Lastname"/>
                </div>
                <Divider />
                <div className="text-center">
                    <button className="py-2 w-full bg-black text-white hover:bg-gray-500">Sign Up</button>

                    <div className="text-center mt-4 text-sm">
                    By signing up, you agree to the
                    <Link className="underline mr-2 text-gray-700"> Terms of Service </Link>
                    ands
                    <Link className="underline ml-2 text-gray-700">Privacy Policy</Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp;