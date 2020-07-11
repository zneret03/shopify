import React from 'react';

const Navbar:React.SFC = () => {
    return(
        <div>
            <div className="w-full">
                <div className="shadow">
                    <div className="container mx-auto px-3 py-4 flex items-center justify-end">
                        <span className="mr-5 cursor-pointer">Home</span>
                        <span className="mr-5 cursor-pointer">Inventory</span>
                        <span className="mr-5 cursor-pointer">Orders</span>
                        <span className="mr-5 cursor-pointer">Product</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;