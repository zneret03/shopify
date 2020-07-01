import React, {useState} from 'react';
import {ArrowLeftCircle} from 'react-feather';
import {Divider} from 'antd';
import {Link} from 'react-router-dom';
import {auth, db} from '../../config/firebase';

interface Props {
    back : (event : React.MouseEvent<SVGAElement, MouseEvent>) => void
}

const SignUp:React.SFC<Props> = ({back}) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //const SignInInfo = {firstname, lastname, email, password}

        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            if(cred.user !== null){
                return db.collection('user').doc(cred.user.uid).set({
                    Id : cred.user.uid,
                    email : email,
                    firstname : firstname, 
                    lastname : lastname,
                    password : password
                });
            }
        })
        .catch((err) => {
            setError(err.message);
        });
    }

    return(
        <>
            <div>
                <ArrowLeftCircle className="cursor-pointer hover:text-red-500" onClick={back}/>
            </div>
            <div className="text-center mb-5">
                <span className="font-bold text-3xl">Sign up</span>
            </div>
            <form action="" onSubmit={(event) => onSubmit(event)}>
                <div className="mb-4">
                    <input type="text" required value={firstname} onChange={(event) => setFirstname(event.target.value)}
                    className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" 
                    placeholder="Firstname"/>
                </div>
                <div className="mb-4">
                    <input type="text" required value={lastname} onChange={(event) => setLastname(event.target.value)}
                    className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" 
                    placeholder="Lastname"/>
                </div>
                <div className="mb-4"> 
                    <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)}
                    className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" 
                    placeholder="Email"/>
                </div>
                <div>
                    <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)}
                    className="border block py-2 w-full px-4 rounded hover:border-red-500 focus:border-red-500" 
                    placeholder="Lastname"/>
                </div>
                <Divider />
                <div className="text-center">
                    {error && ( 
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700">
                        <p className="font-bold">Warning!!!</p>
                        <p>{error}</p>
                    </div>
                    )}
                   
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