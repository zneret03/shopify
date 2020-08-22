import React from 'react';
import {ChevronRight} from 'react-feather';
const Filters : React.SFC = () => {
    return(
        <div className="border border-black">
         <div className="py-4 w-full">
             <div className="flex justify-between px-8">
                 <div className="flex">
                     <span>Price</span>
                     <i className="ml-2"><ChevronRight size="20"/></i>
                 </div>
                 <div className="flex">
                     <span>Hide Filters</span>
                     <i className="ml-2"><ChevronRight size="20"/></i>
                 </div>  
             </div>
         </div>
     </div>
    )
}

export default Filters;
