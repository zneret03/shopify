import React from 'react';
import {Link} from 'react-router-dom';
import {shoesInformation} from '../../utils/mockData'
const NewArival:React.FC = () => {
    return(
        <div>
            <div className="py-5 flex lg:flex-row flex-col">
                {shoesInformation.map((info) => (
                <div className="sm:px-24 sm:py-10 px-10 py-6 bg-gray-200 mr-5 mt-5">
                    <img className="sm:w-11/12 sm:h-11/12 w-9/12 h-9/12 mx-auto" src={require(`../../image/${info.image}`)} alt=""/>
                    <div className="text-center mt-5">
                        <span className="block sm:text-xl text-sm text-black font-bold mb-1">{info.title}</span>
                        <span className="block sm:text-sm text-xs mb-5">{info.slogan}</span>
                        <Link to={info.redirect} style={{color : '#FFF'}}
                         className="bg-black text-white font-bold py-3 sm:px-5 px-8 sm:text-lg text-xs hover:bg-gray-900">
                             {info.buttonName}
                        </Link>
                    </div>
                </div>
                ))}
        </div>
    </div>
    )
}

export default NewArival;