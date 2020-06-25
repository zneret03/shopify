import React from 'react';
import Navbar from '../components/Navbar';
const Home: React.FC = () => {

    const shoesInformation = [
        {
            id : 1,
            title : 'THE NEW UNIFORIA',
            slogan : 'KICK START',
            image : 'nike1.png',
            buttonName : 'SHOP NOW'
        },
        {
            id : 2,
            title : '4KD RUN',                                                                                                      
            slogan : 'FEEL THE FUTURE',
            image : 'nike2.png',
            buttonName : 'SHOP 4KD'
        }
    ]

    return(
        <div>
            <Navbar />
            <div className="bg-gray-100 font-mono">
                <div className="sm:px-24 px-16 py-8">
                    <div>
                        <div className="absolute mt-8 ml-8 lg:block hidden">
                            <svg width="74" className="w-48 h-48" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.2556 29.309V11.2236L21.501 0V15.7669C4.8846 20.0425 8.05067 24.1737 10.5994 25.9404L0 30.6524L17.277 38.3381L34.7797 30.6524L17.277 22.9727L10.9527 25.7849C8.2387 22.39 16.5029 18.3306 21.501 16.2699V18.3134L36.2556 29.309Z" fill="#FAE8E8"/>
                                <path d="M53.3999 42.6885L38.6454 31.6917V49.7762L45.0973 54.6847C43.9564 59.3211 37.5094 55.8395 32.8624 52.5939L36.5699 49.7762V31.6917L21.8153 42.6885V61L32.1664 53.1269C43.669 64.0448 45.0526 57.127 45.2045 54.7631L53.4005 61L53.3999 42.6885Z" fill="#FAE8E8"/>
                                <path d="M58.5833 23.8894C62.5062 6.94446 55.4866 9.62743 53.0847 10.9597V0.0010376L38.3297 11.224V29.3087L53.0847 18.3098V11.1047C58.2909 9.28395 58.4201 18.2472 58.0517 23.6553L56.4987 22.9731L39.2216 30.6534L56.4987 38.3391L74 30.6534L58.5833 23.8894Z" fill="#FAE8E8"/>
                            </svg>
                        </div> 
                        <div className="font-mono text-black lg:flex lg:justify-between">
                            <div className="pt-32 z-10">
                                <span className="font-bold sm:text-5xl text-3xl block">Epic React</span>
                                <span className="font-bold sm:text-5xl text-3xl block">2 Nike</span>
                                <span className="font-bold sm:text-5xl text-3xl block">Shoes</span>
                                <span className="font-segoe-UI text-gray-600 block">Design to make you move</span>
                                <div className="mt-8">
                                    <button className="bg-black text-white font-bold py-2 sm:px-8 px-10 sm:text-xl hover:bg-gray-700">SHOP NOW</button>
                                </div>
                            </div>
                            <div className="pt-12">
                                <img className="lg:w-11/12 lg:block" src={require('../image/ShoesLandingPage.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:px-24 px-5">
                    <div className="py-5 flex lg:flex-row flex-col">
                        {shoesInformation.map((info) => (
                        <div className="sm:px-24 sm:py-10 px-10 py-6 bg-gray-200 mr-5 mt-5">
                            <img className="sm:w-11/12 sm:h-11/12 w-9/12 h-9/12 mx-auto" src={require(`../image/${info.image}`)} alt=""/>
                            <div className="text-center mt-5">
                                <span className="block sm:text-xl text-sm text-black font-bold mb-1">{info.title}</span>
                                <span className="block sm:text-sm text-xs mb-5">{info.slogan}</span>
                                <button className="bg-black text-white font-bold py-2 sm:px-5 px-8 sm:text-lg text-xs hover:bg-gray-900">{info.buttonName}</button>
                            </div>
                        </div>
                        ))}
                    </div>
                        <div className="mb-5 flex">
                            <div className="px-20 py-16 bg-gray-200 mr-2">
                                <img className="w-32 h-32 mx-auto" src={require(`../image/Shoes1.png`)} alt=""/>
                            </div>
                            <div className="px-6 py-6 bg-gray-200 mr-2">
                                <img className="w-full h-full mx-auto" src={require(`../image/Shoes2.png`)} alt=""/>
                            </div>
                            <div className="px-20 py-16 bg-gray-200 mr-2">
                                <img className="w-32 h-32 mx-auto" src={require(`../image/Shoes3.png`)} alt=""/>
                            </div>
                            <div className="px-20 py-16 bg-gray-200 mr-2">
                                <img className="w-32 h-32 mx-auto" src={require(`../image/Clothing.png`)} alt=""/>
                            </div>
                        </div>
                </div>
               
            </div>
        </div>
    )
}

export default Home;