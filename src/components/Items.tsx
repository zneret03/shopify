import React from 'react';
import {shoes} from '../utils/mockData'
const Items:React.FC = () => {
    return(
    <div className="pt-2">
        <p className="text-3xl text-black">Items</p>
        <div className="mb-5 grid grid-rows md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {shoes.map(info => (
                <div className="px-10 py-10 bg-gray-200 text-center mr-5 mt-2">
                    <img className="w-48 h-48 object-contain mx-auto" src={require(`../image/${info.image}`)} alt=""/>
                    <span className="mt-5 uppercase font-bold text-black underline tracking-widest">{info.name}</span>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Items;