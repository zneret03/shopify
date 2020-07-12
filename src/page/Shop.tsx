import React, {useContext} from 'react';
import {ArrowLeft, ChevronDown} from 'react-feather';
import {Link} from 'react-router-dom';
import {ProductContext} from '../Context/ProductProvider';

const Shop:React.SFC = () => {

    const {items} = useContext(ProductContext);

    return(
        <div className="font-mono text-black">
            <div className="container mx-auto px-6 py-8">
                <div className="flex">
                    <i className="mr-2"><ArrowLeft size="20"/></i>
                    <Link to="/">
                        <span className="uppercase tracking-widest underline font-bold text-black">Back</span>
                    </Link>
                </div>
                <div className="my-8">
                    <span className="uppercase text-3xl font-bold">all products</span>
                    <span className="ml-3 text-gray-500">[{items.length}]</span>
                </div>
                <div className="border border-black">
                    <div className="py-4 w-full">
                        <div className="uppercase flex justify-between px-8">
                            <div className="flex">
                                <span>Price</span>
                                <i className="ml-2"><ChevronDown size="20"/></i>
                            </div>
                            <div className="flex">
                                <span>Sort By</span>
                                <i className="ml-2"><ChevronDown size="20"/></i>
                            </div>  
                        </div>
                    </div>
                </div>
                {/* <div className="mt-3">
                    <button className="px-5 block bg-gray-300 rounded-sm text-sm cursor-default">Womens</button>
                </div> */}
                <div className="grid grid-rows md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {items.map((item : any) => (
                    <div className="border mt-5 mr-2" key={item.uid}>
                         <div className="py-6 px-12 bg-gray-200">
                                 <img className="sm:w-64 sm:h-64 object-contain mx-auto" src={item.imageUrl} alt=""/>
                         </div>
                         <div className="px-4 py-2 font-segoe-UI">
                            <span className="block text-xs text-gray-600 mb-4">{item.purpose}</span>
                            <span className="block text-xs uppercase tracking-wide mb-1">{item.product}</span>
                             <span className="text-black text-gray-800">₱{item.price}</span>
                         </div>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop;