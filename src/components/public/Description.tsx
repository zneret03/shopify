import React from 'react';

const Description: React.SFC = () => {
    return (
        <div className="mt-5">
            <div className="shadow w-full rounded">
                <div className="px-6 py-2">
                    <div className="">
                        <span className="text-xl font-bold">Product Description</span>
                        <p className="leading-relaxed">
                        is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                         It has survived not only five centuries, but also the leap into electronic typesetting, 
                         remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                         sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                         Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <div className="py-3 flex items-center ">
                            <span className="bg-gray-300 py-1 px-4 rounded-full font-bold text-sm">#Shopify</span>
                            <span className="bg-gray-300 py-1 px-4 rounded-full font-bold text-sm mx-3">#Joy</span>
                            <span className="bg-gray-300 py-1 px-4 rounded-full font-bold text-sm">#Snapshot</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;