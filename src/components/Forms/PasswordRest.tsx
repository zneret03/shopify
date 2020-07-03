import React, {useState} from 'react';
import {ArrowLeftCircle} from 'react-feather';
import {Divider} from 'antd';
import {auth} from '../../config/firebase';
import {Info} from 'react-feather';
interface Props {
     back : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const PasswordReset:React.SFC<Props> = ({back}) => {

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth.sendPasswordResetEmail(email)
    .then(() => {
        setMessage('Check your email')
        setEmail('');
    })
    .catch((error : any) => {
        setMessage(error.message);
    });

    }

    return( 
        <>
         <div>
            <ArrowLeftCircle className="cursor-pointer hover:text-red-500" onClick={back}/>
        </div>
        <div className="text-center my-5">
            <span className="font-bold sm:text-xl text-lg uppercase">reset your password</span>
            <p className="mt-2">We will send you email to reset your password</p>
        </div>
        <form action="" onSubmit={(event) => onSubmit(event)}>
            <div>
                <input value={email} onChange={(event) => setEmail(event.target.value)}
                className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" 
                type="email" 
                placeholder="example@yahoo.com"/>
            </div>
            <Divider />
            <div>
                {message && (
                    <div className="bg-orange-100 border-l-2 border-orange-500 p-1 mb-2">
                        <div className="flex items-center ml-2">
                            <span className="mr-1"><Info size="15"/></span>
                            <span className="font-bold">Information</span>
                        </div>
                        <span className="p-2 block">{message}</span>
                    </div>
                )}
               
                <button className="py-2 w-full bg-black text-white hover:bg-gray-500">Submit</button>
            </div>
        </form>
        </>
    )
}

export default PasswordReset;