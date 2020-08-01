import React from 'react';
import Zoom from 'react-medium-image-zoom';

const Collection: React.SFC = (props : any) => {
    // const params = new URLSearchParams(props.location.search);
    // const id = params.get('id');


    return(
       <>
       <div className="container mx-auto px-20 py-10">
           <div className="flex">
            <div className="w-1/2">
                <div className="bg-gray-200">
                <Zoom>
                    <img className="sm:w-8/12 sm:h-8/12 object-contain mx-auto" 
                    src={require('../../image/4kd.png')}
                    alt=""/>
                </Zoom>
                </div>
                </div>
            <div className="w-1/2 ml-5">
                <span className="text-3xl font-bold">4KD</span>
                <span className="text-xl font-bold block">₱10000</span>
                <div className="flex">
                  <div className="w-full">
                  <span>Size</span>
                  <select name="" id="" className="border py-2 w-full">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                        <option value="4XL">4XL</option>
                    </select>
                  </div>
                  <div className="w-full pl-4">
                  <span>Color</span>
                  <select name="" id="" className="border py-2 w-full">
                        <option value="Red">Red</option>
                        <option value="Red">Blue</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                    <button className="rounded-sm border border-black py-2 w-full uppercase tracking-wider font-bold hover:text-gray-600">Add Cart</button>
                </div>
                <div className="mt-3">
                    <button 
                    className="rounded-sm py-2 w-full uppercase tracking-wider font-bold bg-gray-800 text-white hover:bg-gray-700">
                        Buy it now
                    </button>
                </div>      
            </div>
            </div>
        </div>
       </>
    )
}

export default Collection;