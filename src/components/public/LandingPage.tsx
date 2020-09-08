import React from 'react';
import {Link} from 'react-router-dom'
const LandingPage:React.FC = () => {
    return(
        <>
            {/** Landing page */}
                <div className="sm:px-20 px-5 sm:py-8 px-0 bg-gray-100">
                    <div>
                        <p>dwadawdawd</p>
                        <div className="absolute left-0 mt-8 ml-5 lg:block hidden">
                            <svg width="74" className="w-48 h-48" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.2556 29.309V11.2236L21.501 0V15.7669C4.8846 20.0425 8.05067 24.1737 10.5994 25.9404L0 30.6524L17.277 38.3381L34.7797 30.6524L17.277 22.9727L10.9527 25.7849C8.2387 22.39 16.5029 18.3306 21.501 16.2699V18.3134L36.2556 29.309Z" fill="#FAE8E8"/>
                                <path d="M53.3999 42.6885L38.6454 31.6917V49.7762L45.0973 54.6847C43.9564 59.3211 37.5094 55.8395 32.8624 52.5939L36.5699 49.7762V31.6917L21.8153 42.6885V61L32.1664 53.1269C43.669 64.0448 45.0526 57.127 45.2045 54.7631L53.4005 61L53.3999 42.6885Z" fill="#FAE8E8"/>
                                <path d="M58.5833 23.8894C62.5062 6.94446 55.4866 9.62743 53.0847 10.9597V0.0010376L38.3297 11.224V29.3087L53.0847 18.3098V11.1047C58.2909 9.28395 58.4201 18.2472 58.0517 23.6553L56.4987 22.9731L39.2216 30.6534L56.4987 38.3391L74 30.6534L58.5833 23.8894Z" fill="#FAE8E8"/>
                            </svg>
                        </div> 
                        <div className="font-mono text-black lg:flex lg:justify-between">
                            <div className="pt-32 z-10">
                                <span className="font-bold sm:text-5xl text-3xl block">A Cheaper way</span>
                                <span className="font-bold sm:text-5xl text-3xl block">To Shop</span>
                                <span className="font-bold sm:text-5xl text-3xl block">Items</span>
                                <span className="font-segoe-UI text-gray-600 block">We Created This Just For You.</span>
                                <div className="mt-8">
                                    <Link style={{color : '#FFF'}} 
                                    to="/shop" 
                                    className="bg-black text-white font-bold py-3 sm:px-8 px-10 sm:text-xl hover:bg-gray-900">
                                        SHOP NOW
                                    </Link>
                                </div>
                            </div>
                            <div className="pt-12">
                                <img className="lg:w-11/12 lg:block" src={require('../../image/ShoesLandingPage.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default LandingPage;