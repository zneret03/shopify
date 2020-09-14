import React, {useEffect, useState} from 'react';
import Header from '../components/private/Header';
import {app} from '../config/firebase';
import Card from '../utils/Card';
const CustomerOrders : React.SFC = (props: any) => {

    const params = new URLSearchParams(props.location.search);
    const getId = params.get('id')
    const document = app.firestore();
    const [filter, setFilter] = useState<any[]>([])

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
            // setFilter(itemsArray);
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

    return(
        <>
            <Header pageName={`Customer Items`}>
                {/* <p>{filterStatus.itemStatus}</p> */}
                <Card filteredItems={filter}/>
            </Header>
        </>
    )
}

export default CustomerOrders;