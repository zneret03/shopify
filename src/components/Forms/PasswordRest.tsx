import React from 'react';
import {ArrowLeftCircle} from 'react-feather';
import {Divider} from 'antd';
interface Props {
     back : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const PasswordReset:React.SFC<Props> = ({back}) => {
    return( 
        <>
         <div>
            <ArrowLeftCircle className="cursor-pointer hover:text-red-500" onClick={back}/>
        </div>
        <div className="text-center my-5">
            <span className="font-bold sm:text-xl text-lg uppercase">reset your password</span>
            <p className="mt-2">We will send you email to reset your password</p>
        </div>
        <form action="">
            <div>
                <input className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" type="email" placeholder="example@yahoo.com"/>
            </div>
            <Divider />
            <div>
                <button className="py-2 w-full bg-black text-white hover:bg-gray-500">Submit</button>
            </div>
        </form>
        </>
    )
}

export default PasswordReset;