import React from  'react';
import {X} from 'react-feather';

interface Props {
    close : (event : React.MouseEvent<SVGElement, MouseEvent>) => void
}

const SearchItem:React.FC<Props> = ({close}) => {
    return(
        <div className="font-mono">
            <div className="absolute w-full h-screen flex items-start justify-center bg-gray-900 bg-opacity-50 py-10">
                <div className="shadow rounded md:max-w-3xl max-w-lg w-full bg-white overflow-hidden">
                    <span className="float-right cursor-pointer p-3"><X onClick={close}/></span>
                    <div className="py-5 px-5">
                        <span className="text-2xl">Search Items</span>
                        <input type="text" className="border w-full rounded text-2xl px-4 border focus:border-red-500"/>
                        <button className="my-3 py-2 px-6 bg-black rounded text-white font-bold float-right hover:bg-gray-900">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;