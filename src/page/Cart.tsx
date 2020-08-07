import React, {useContext, useState} from 'react';
import {Divider} from 'antd';
import Back from '../utils/Back';
import {CartContext} from '../Context/CartProvider';



const Cart : React.SFC = () => {
    const {cartItems} = useContext(CartContext);
    const [subTotal, setSubTotal] = useState<number>(0);

    cartItems.forEach((item : any) => {
        item.Subtotal += item.Subtotal;
        console.log(item.Subtotal.toLocaleString());
    })

    return(
        <div className="container mx-auto px-3">
            <div className="md:flex md:justify-between py-8">
                    <div>
                        <Back path="/shop"/>
                        <span className="text-2xl text-black">Shopping Bag</span>
                        <div className="mt-6">
                            <div className="grid grid-rows gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {cartItems.map((items : any, index : number) => (
                                    <div className={`${items.status === "#ff4444" ? 'block' : 'hidden'} border`} key={index}>
                                        <div className="bg-gray-200 py-6 px-6">
                                            <img className="w-40 h-40 object-contain mx-auto" src={items.imageUrl} alt=""/>
                                        </div>
                                        <div className="px-4 py-2 font-segoe-UI">
                                        <div className="flex justify-between">
                                            <span className="block text-xs text-gray-600 mb-4">{items.purpose}</span>
                                            <div className="rounded-full bg-gray-500 h-2 w-2 mt-2" style={{backgroundColor: items.status}}></div>
                                        </div>
                                            <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">{items.product}</span>
                                            <div className="flex items-center justify-between">
                                                <span className="text-black text-xs text-gray-800">₱{items.Subtotal.toLocaleString()}</span>
                                                <span className="block text-xs text-gray-800 uppercase">{items.gender}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/4 w-full md:ml-4 md:mt-0 mt-6 sm:mt-6">
                        <span className="text-2xl text-black">Product Summary</span>
                        <Divider />
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₱</span>
                            </div>
                       <div className="text-center mt-10">
                        <button className="border py-3 w-full rounded-full text-lg hover:bg-gray-300 hover:text-white">Check out</button>
                       </div>
                    </div>
            </div>
        </div>
    )
}

export default Cart;