import React from 'react';
import Header from '../components/private/Header';

const OrderInformation : React.SFC = (props : any) => {

    const params = new URLSearchParams(props.location.search);
    const getId = params.get('id');

    console.log(getId);
    /**Adding order information add edit and delete */
    return(
        <>
            <Header pageName={`Order Information`}>   
            </Header>   
        </>
    )
}

export default OrderInformation;