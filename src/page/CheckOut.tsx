import React, {useContext, useState} from 'react';
import {Divider} from 'antd';
import Back from '../utils/Back';
import {CartContext} from '../Context/CartProvider';
import {pendingItems} from '../utils/FilteredItems';
import {GetRegion, GetProvince} from '../utils/RegionProvince';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

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
    const [message, setMessage] = useState({status : false, message: '', loading : false});
    
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
        if(amount !== 0){
            setSubTotal(amount);
        }else{
            setSubTotal(0);
        }
    }).catch((error) => {
        setSubTotal(0);
        console.log(error.message);
    });


    const [{firstName, lastName, email, address, zipcode}, setState] = useState(itemsObject);
    const [activeRegion, setActiveRegion] = useState('NCR');
    const [province, setProvince] = useState('Metro Manila');

    const onChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
    }

    const loadSpinner = () =>{
        setMessage({status : false, message : '', loading : true});
    }

    const clearState = () => {
        setState({...itemsObject});
    }

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //console.log({firstName, lastName, email, address, subTotal, activeRegion, province, zipcode , pending});
        loadSpinner();

        axios({
           method : 'post', 
           url : '/api/index?name=checkOut',
           headers : { 'Access-Control-Allow-Origin': '*'},
           data : {
            firstName,
            lastName,
            email,
            address,
            subTotal,
            activeRegion,
            province,
            zipcode,
            pending
           }
        }).then((response) => {
            if(response){
                setMessage({status : true, message : response.data, loading : false});
                setMessage({status : false, message : 'Checkout Success', loading : false});
                setTimeout(() => {
                    clearState();
                    setMessage({status : false, message : '', loading : false});
                }, 2000)
            }
        }).catch((error) => {
            console.log(error.message)
            if(error) {
                setMessage({status : true, message : 'Checkout Denied', loading : false});
            }
        });
    }

    if(message.loading){
        return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>
    }

    if(pending.length <= 0){
        return <Redirect to="/cart"/>
    }

    return(
        <>
        <div className="container mx-auto px-10 py-6">
            <div className="text-center my-5">
                <span className="text-2xl text-black">Checkout Form</span>
            </div>
            <div className="md:flex md:justify-between">
               <div className="w-full mb-2">
                <form onSubmit={(event) => onSubmit(event)} className="shadow py-6 px-6 md:mr-6">
                    <Back path="/cart"/>
                    <h1 className="text-2xl">Billing Address</h1>
                    <p className={`${message.status ? 'bg-red-500' : 'bg-green-500'} text-center py-1 rounded text-white`}>
                        {message.message}
                    </p>
                    <div>
                        <div className="mb-2 grid sm:grid-cols-2 sm:gap-2">
                            <div className="mr-2">
                                <span className="mr-3 block">First Name</span>
                                <input type="text" 
                                value={firstName} 
                                name="firstName" 
                                required
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded px-2 w-full"/>
                            </div>
                            <div>
                                <span className="mr-3 text-sm block">Last Name</span>
                                <input type="text" 
                                value={lastName} 
                                name="lastName" 
                                required
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded px-2 w-full"/>
                            </div>
                        </div>
                            <div className="mb-2">
                                <span className="text-sm block">Email</span>
                                <input type="email" 
                                value={email} 
                                name="email" 
                                required
                                onChange={(event) => onChange(event)}
                                className="border py-1 rounded w-full px-2"/>
                            </div>
                        <div className="mb-2">
                                <span className="mr-3 text-sm block">Address</span>
                                <input type="text" 
                                value={address} 
                                name="address" 
                                required
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
                                required
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
                            <div className={`${items.status.color === "#ff4444" ? "block" : "hidden"}`}>
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
        </>
    );
}

export default CheckOut;