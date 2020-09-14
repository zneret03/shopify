import React, {useEffect, useState, useContext} from 'react';
import Header from '../components/private/Header';
import {app} from '../config/firebase';
import Card from '../utils/Card';
import Back from '../utils/Back';
import {AuthContext} from '../auth/AuthProvider';
import {filteredProduct} from '../utils/FilteredItems';

const CustomerOrders : React.SFC = (props: any) => {

    const params = new URLSearchParams(props.location.search);
    const getId = params.get('id')
    const document = app.firestore();
    const [filter, setFilter] = useState<any[]>([])
    const currentUser : any = useContext(AuthContext);

    /**Get Items Data from server */
    const onFetchItems = async(items : any) => {
           if(items){
                const data = await Promise.all(items.map(async(id : any) => {
                    const fetchItems = document.collection('transaction').doc(id);
                    const getDataItems = await fetchItems.get();
                    if(getDataItems){
                        return getDataItems.data()
                    }
                    })
                ) 
                setFilter(data);
           }
    }

    const fetchItems = () => {
        (async() => {
            const fetchItems = document.collection('customerInformation').doc(getId);
            const customerItemsData = await fetchItems.get();

            if(customerItemsData){
                onFetchItems(customerItemsData.data().items)
            }
        })()
    }

    //*Render all id coming from URL query string*/
    useEffect(fetchItems,[getId])

    //**Get products according to user owner ID */
    const filterProduct = filteredProduct(filter, currentUser);
    return(
        <>
            <Header pageName={`Customer Items`}>
                <Back path="/order"/>
                <Card filteredItems={filterProduct}/>
            </Header>
        </>
    )
}

export default CustomerOrders;