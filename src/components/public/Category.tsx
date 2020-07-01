import React from 'react';
import {Link} from 'react-router-dom';
import {CategoryInformation} from '../../utils/mockData'

const Category:React.FC = () => {
    return(
        <div className="pt-5">
            <p className="text-3xl text-black">Category</p>
            <div className="flex flex-wrap justify-center my-2">
            {CategoryInformation.map(info => (
            <div className="relative mr-3 mt-2" key={info.id}>
                 <img className="sm:max-w-sm max-w-xs object-contain" src={require(`../../image/${info.image}`)} alt=""/>
                 <div className="flex justify-center tracking-widest">
                     <Link to={info.redirect} style={{color : '#000'}}
                      className="absolute bottom-0 my-5 text-black border py-2 px-8 sm:text-lg text-sm bg-white font-bold hover:opacity-75 uppercase">
                         {info.buttonName}
                     </Link>
                 </div>
             </div>         
            ))}
            </div>
        </div>
    );
}

export default Category;