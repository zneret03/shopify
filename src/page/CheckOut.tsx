import React, {useContext, useState} from 'react';
import {Divider} from 'antd';
import Back from '../utils/Back';
import {CartContext} from '../Context/CartProvider';
import {pendingItems} from '../utils/PendingItems';
import {GetRegion, GetProvince} from '../utils/RegionProvince';

interface itemTypes { 
    firstName : string,
    lastName : string,
    email : string,
    address : string,
    zipcode : string
}

const itemsObject : itemTypes = {
    firstName : '',
    lastName : '',
    email : '',
    address : '',
    zipcode : ''
}

const CheckOut : React.SFC = () => {

    const {cartItems} = useContext(CartContext);
    const [subTotal, setSubTotal] = useState(0);
    const pending = pendingItems(cartItems);
    
    const totalAmount = () => {
        return new Promise((resolve, reject)=>{
            if(cartItems){
                    const total = pending.reduce((a : any, b : any) => a + b.Subtotal, 0);
                    resolve(total);
            }else{  
                reject('No amount gettting');
            }
        })
    }
    
    totalAmount().then((amount : any)=>{
        if(amount){
            setSubTotal(amount);
        }
    }).catch((error) => {
        setSubTotal(0);
        console.log(error.message);
    });


    const [{firstName, lastName, email, address, zipcode}, setState] = useState(itemsObject);
    const [activeRegion, setActiveRegion] = useState('NCR');
    const [province, setProvince] = useState('');

    const onChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
    }

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({firstName, lastName, email, address, subTotal, activeRegion, province, zipcode , pending});
    }

    return(
        <div className="container mx-auto px-10 py-6">
            <div className="text-center my-5">
                <span className="text-2xl text-black">Checkout Form</span>
            </div>
            <div className="md:flex md:justify-between">
               <div className="w-full mb-2">
                <form onSubmit={(event) => onSubmit(event)} className="shadow py-6 px-6 md:mr-6">
                    <Back path="/cart"/>
                    <h1 className="text-2xl">Billing Address</h1>
                    <div>
                        <div className="mb-2 grid sm:grid-cols-2 sm:gap-2">
                            <div className="mr-2">
                                <span className="mr-3 block">First Name</span>
                                <input type="text" 
                                value={firstName} 
                                name="firstName" 
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded px-2 w-full"/>
                            </div>
                            <div>
                                <span className="mr-3 text-sm block">Last Name</span>
                                <input type="text" 
                                value={lastName} 
                                name="lastName" 
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded px-2 w-full"/>
                            </div>
                        </div>
                            <div className="mb-2">
                                <span className="text-sm block">Email</span>
                                <input type="email" 
                                value={email} 
                                name="email" 
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded w-full px-2"/>
                            </div>
                        <div className="mb-2">
                                <span className="mr-3 text-sm block">Address</span>
                                <input type="text" 
                                value={address} 
                                name="address" 
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded w-full px-2"/>
                        </div>
                        <div className="grid sm:grid-cols-3 sm:gap-1">
                            <div className="mr-2">
                                <span className="text-sm block">Regions</span>
                                <GetRegion 
                                onChange={(event) => setActiveRegion(event.target.value)} 
                                value={activeRegion}/>
                            </div>
                            <div className="mr-2">
                                <span className="text-sm block">Province</span>
                                <GetProvince region={activeRegion} 
                                onChange={(event) => setProvince(event.target.value)} 
                                value={province}/>
                            </div>
                            <div>
                                <span className="text-sm block">Zipcode</span>
                                <input type="text" value={zipcode} name="zipcode" 
                                className="border py-1 px-2 rounded w-full" onChange={(event) => onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="text-right">
                        <button className="border py-1 px-4 rounded bg-red-500 text-white hover:bg-red-400">Checkout</button>
                    </div>
                </form>
                </div>
                <div className="md:w-1/2">
                    <div className="shadow px-5 py-4">
                         <div className="my-5 flex justify-between items-center">
                             <div><span className="text-2xl text-black">Your cart</span></div>
                            <div><span className="bg-gray-400 py-2 px-3 rounded-full text-white font-bold">{pending.length}</span></div>
                        </div>
                        {pending.map((items : any) => (
                            <div className={`${items.status === "#ff4444" ? "block" : "hidden"}`}>
                            <div className="flex items-center justify-between overflow-auto">
                                <div>
                                    <span className="font-bold text-lg">{items.productName}</span>
                                    <span className="block">{items.purpose}</span>
                                </div>
                                <div>
                                    <span className="block text-sm">{items.Subtotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <Divider />
                            </div>
                        ))}
                        <div className="text-right flex items-center justify-between">
                            <span className="text-lg font-bold">Total</span>
                            <span className="block">₱{subTotal.toLocaleString()}</span>
                        </div>
                    </div>       
                </div>
            </div>
        </div>
    );
}

export default CheckOut;