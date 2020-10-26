import React from 'react';
import {Facebook, Twitter, Instagram, GitHub} from 'react-feather';
const Footer:React.SFC = () => {

    const socialIcons = [
        {
            id : 'fb',
            name : 'Facebook',
            icon : <Facebook className="mx-2 text-black hover:text-black" size="20"/>,
            link : 'https://www.facebook.com/ian.drilon.7',
        },
        {
            id : 'tw',
            name : 'Twitter',
            icon : <Twitter className="mx-2 text-black hover:text-black" size="20"/>,
            link : 'https://twitter.com/DrilonIan'
        },
        {
            id :'Instagram',
            name : 'Instagram',
            icon : <Instagram className="mx-2 text-black hover:text-black" size="20"/>,
            link : 'https://www.instagram.com/ian.drilon.7/'
        },
        {
            id :'gh',
            name : 'Github',
            icon : <GitHub className="mx-2 text-black hover:text-black" size="20"/>,
            link : ''
        }
    ]

    return(
        <div className="container mx-auto sm:px-6 px-5 py-1">
           <div className="sm:flex sm:items-center sm:justify-between">
               <div className="sm:flex sm:items-center text-center">
                    <svg width="74" className="w-16 h-16 cursor-pointer mx-auto" height="61" viewBox="0 0 74 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.2556 29.309V11.2236L21.501 0V15.7669C4.8846 20.0425 8.05067 24.1737 10.5994 25.9404L0 30.6524L17.277 38.3381L34.7797 30.6524L17.277 22.9727L10.9527 25.7849C8.2387 22.39 16.5029 18.3306 21.501 16.2699V18.3134L36.2556 29.309Z" fill="black"/>
                        <path d="M53.3999 42.6885L38.6454 31.6917V49.7762L45.0973 54.6847C43.9564 59.3211 37.5094 55.8395 32.8624 52.5939L36.5699 49.7762V31.6917L21.8153 42.6885V61L32.1664 53.1269C43.669 64.0448 45.0526 57.127 45.2045 54.7631L53.4005 61L53.3999 42.6885Z" fill="black"/>
                        <path d="M58.5833 23.8894C62.5062 6.94446 55.4866 9.62743 53.0847 10.9597V0.0010376L38.3297 11.224V29.3087L53.0847 18.3098V11.1047C58.2909 9.28395 58.4201 18.2472 58.0517 23.6553L56.4987 22.9731L39.2216 30.6534L56.4987 38.3391L74 30.6534L58.5833 23.8894Z" fill="black"/>
                    </svg>
                    <span className="ml-5 font-bold sm:text-sm text-xs text-black">©2020 Circuit St. Santa Barbara Iloilo City</span>
                </div>
                <div className="font-bold sm:flex" style={{color : '#8D7979'}}>
                    <div className="flex justify-center mt-2">
                        {socialIcons.map((icons) => (
                            <ul key={icons.id}>
                                <li className="border border-gray-200 hover:border-gray-800 rounded-full py-3 px-1 mx-1"><a href={icons.link}>{icons.icon}</a></li>
                            </ul>
                        ))}
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Footer