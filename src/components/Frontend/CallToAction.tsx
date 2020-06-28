import React from 'react';
import {Link} from 'react-router-dom';
const CallToAction:React.FC = () => {
    return(
        <>
            <div className="mt-10">
                <div className="flex items-center flex-wrap justify-center justify-between py-10 lg:px-64 px-16" style={{backgroundColor : '#ECF037'}}>
                    <div className="leading-10 text-black">
                        <span className="block sm:text-4xl text-2xl font-bold">DISCOVER SOME MORE!</span>
                        <span className="block sm:text-sm text-xs">You gonna love this one!</span>
                    </div>
                    <div className="sm:mt-0 mt-5">
                        <Link to="/login" style={{color : '#FFF'}} 
                        className="py-3 sm:px-10 px-5 bg-black sm:text-2xl text-lg font-bold text-white hover:bg-gray-900 uppercase">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallToAction;