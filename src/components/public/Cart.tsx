import React from 'react';
import {Divider} from 'antd';
import Back from '../../utils/Back';

const Cart : React.SFC = () => {

    return(
        <div className="container mx-auto px-3">
            <div className="md:flex md:justify-between py-8">
                    <div>
                        <Back path="/shop"/>
                        <span className="text-2xl text-black">Shopping Bag</span>
                        <div className="mt-6">
                            <div className="grid grid-rows gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/nike1.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/nike2.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/Clothing.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/Shoes1.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/Shoes2.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="bg-gray-200 py-6 px-6">
                                        <img className="w-40 h-40 object-contain mx-auto" src={require('../../image/Shoes3.png')} alt=""/>
                                    </div>
                                    <div className="px-4 py-2 font-segoe-UI">
                                        <span className="block text-xs text-gray-600 mb-4">Running</span>
                                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">4kd</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black text-xs text-gray-800">₱5000</span>
                                            <span className="block text-xs text-gray-800 uppercase">Male</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/4 w-full md:ml-4 md:mt-0 mt-6 sm:mt-6">
                        <span className="text-2xl text-black">Product Summary</span>
                        <Divider />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₱0.00</span>
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