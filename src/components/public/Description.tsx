import React from 'react';

interface PropsType {
    description : string,
    gender : string,
    productName : string
}

const Description: React.SFC<PropsType> = ({description, gender, productName}) => {
    return (
        <div className="mt-5">
            <div className="shadow w-full rounded">
                <div className="sm:px-6 px-3 sm:py-6 py-3">
                    <div className="">
                        <span className="sm:text-xl text-sm font-bold mb-3">Product Description</span>
                        <p className="leading-relaxed sm:text-sm text-xs">{description}</p>
                        <div className="py-3 flex flex-wrap sm:items-center">
                            <span className="bg-gray-300 py-1 px-4 rounded-full font-bold text-xs sm:text-sm">#Shopify</span>
                            <span className="bg-gray-300 py-1 my-1 px-4 rounded-full font-bold text-xs sm:text-sm mx-3">#{gender}</span>
                            <span className="bg-gray-300 py-1 px-4 rounded-full font-bold text-xs sm:text-sm">#{productName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;