import React from 'react';
import {Divider} from 'antd';

const Cart : React.SFC = () => {

    return(
        <div className="container mx-auto px-20">
            <div className="flex justify-between  py-8">
                    <div>
                        <span className="text-2xl text-black">Shopping Bag</span>
                        <div className="mt-3">
                            dwad
                        </div>
                    </div>
                    <div className="w-1/4">
                        <span className="text-2xl text-black">Summary</span>
                        <Divider />
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>₱0.00</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Cart;