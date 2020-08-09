import React, {useContext, useState} from 'react';
import {Divider} from 'antd';
import Back from '../utils/Back';
import {CartContext} from '../Context/CartProvider';
import {totalAmount} from '../utils/TotalAmount';

const CheckOut : React.SFC = () => {

    const {cartItems} = useContext(CartContext);
    const [subTotal, setSubTotal] = useState(0);
    const productTotalAmount = totalAmount(cartItems);

    productTotalAmount.then((amount : any)=>{
        if(amount){
            setSubTotal(amount);
        }
    }).catch((error) => {
        setSubTotal(0);
        console.log(error.message);
    })

    return(
        <div className="container mx-auto px-10 py-6">
            <div className="text-center my-5">
                <span className="text-2xl text-black">Checkout Form</span>
            </div>
            <div className="md:flex md:justify-between">
               <div className="w-full mb-2">
                <form className="shadow py-6 px-6 md:mr-6">
                    <Back path="/cart"/>
                    <h1 className="text-2xl">Billing Address</h1>
                    <div>
                        <div className="mb-2 grid sm:grid-cols-2 sm:gap-2">
                            <div className="mr-2">
                                <span className="mr-3 block">Full Name</span>
                                <input type="text" className="border py-1 rounded px-2 w-full"/>
                            </div>
                            <div>
                                <span className="mr-3 text-sm block">Last Name</span>
                                <input type="text" className="border py-1 rounded px-2 w-full"/>
                            </div>
                        </div>
                            <div className="mb-2">
                                <span className="text-sm block">Email</span>
                                <input type="text" className="border py-1 rounded w-full px-2"/>
                            </div>
                        <div className="mb-2">
                                <span className="mr-3 text-sm block">Address</span>
                                <input type="text" className="border py-1 rounded w-full px-2"/>
                        </div>
                        <div className="grid sm:grid-cols-3 sm:gap-1">
                            <div className="mr-2">
                                <span className="text-sm block">Country</span>
                                <input type="text" className="border py-1 rounded w-full"/>
                            </div>
                            <div className="mr-2">
                                <span className="text-sm block">State</span>
                                <input type="text" className="border py-1 rounded w-full"/>
                            </div>
                            <div>
                                <span className="text-sm block">Zipcode</span>
                                <input type="text" className="border py-1 rounded w-full"/>
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
                         <div className="my-5">
                            <span className="text-2xl text-black">Your cart</span>
                        </div>
                        {cartItems.map((items : any) => (
                            <>
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
                            </>
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