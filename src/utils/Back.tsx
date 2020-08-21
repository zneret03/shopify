import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'react-feather';

interface PropsType {
    path : string
}

const Back : React.SFC<PropsType> = ({path}) => {
    return(
        <Link to={path} className="flex items-center mb-6">
            <i className="mr-2"><ArrowLeft size="20" color="#000"/></i>
            <span></span>
            <span className="uppercase tracking-widest underline font-bold text-black">Back</span>
        </Link>
    );
}

export default Back;