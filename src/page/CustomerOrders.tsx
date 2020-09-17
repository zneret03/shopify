import React, {useEffect, useState, useContext} from 'react';
import Header from '../components/private/Header';
import {app} from '../config/firebase';
import Card from '../utils/Card';
import Back from '../utils/Back';
import {AuthContext} from '../auth/AuthProvider';
import {withRouter} from 'react-router-dom';
import {filteredProduct} from '../utils/FilteredItems';
import DropdownComponent from '../components/Forms/DropdownComponent';
//import {Transition} from '@tailwindui/react';

const CustomerOrders : React.SFC = (props: any) => {

    const params = new URLSearchParams(props.location.search);
    const getId = params.get('id')
    const document = app.firestore();
    const [filter, setFilter] = useState<any[]>([])
    const currentUser : any = useContext(AuthContext);

    //**Redirect uti customerOrder/OrderInformation */
    const redirectRequest = (event : React.MouseEvent<HTMLLIElement, MouseEvent>, id : string) => {
        event.preventDefault();
        id && props.history.push(`/order/customerOrder/OrderInformation?id=${id}`);
    }   

    /**Get Items Data from server */
    const onFetchItems = async(items : any) => {
           if(items){
            const arrayItems = items.map(async(id : any) => {
                const fetchItems = document.collection('transaction').doc(id);
                const getDataItems = await fetchItems.get();
                    if(getDataItems){
                        return {...getDataItems.data(), id: getDataItems.id}
                    }
                })

                const data = await Promise.all(arrayItems) 
                setFilter(data);
           }
    }

    //**Get customer id */
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
    const filterProduct : any = filteredProduct(filter, currentUser);

    const [totalPurchase, setTotalPurchase] = useState(0);

    const totalProductPurchase = Promise.resolve(
        filterProduct.reduce((a : number, b : any) => a + b.Subtotal, 0)
    )

    const [sortingTypes, setSortingTypes] = useState([]);
    const [productSort, setProductSort] = useState('');

    //**Sorted Data */
    const getSortData = (type : string) => {
        const map = {
            price : 'Subtotal',
            product : 'product',
            purpose : 'purpose'
        }
        const sortTypes = map[type]

        const sorted = filterProduct.sort((a : any, b : any) => {
            if(sortTypes === "product" || sortTypes === "purpose"){
                if(a[sortTypes] < b[sortTypes]) {return -1};
                if(a[sortTypes] > b[sortTypes]) {return 1};
                return 0;
            }else{
                return b[sortTypes] - a[sortTypes]
            }
        })

        setSortingTypes(sorted)
    }

    useEffect(() => getSortData(productSort), [productSort]);

    const changeSortTypes = (event : React.MouseEvent<HTMLSpanElement, MouseEvent>, types : string) =>{
        event.preventDefault();
        setProductSort(types);
    }

    const sortTypes = ['price','product', 'purpose'];

    totalProductPurchase.then((total : number) => total !== 0 && setTotalPurchase(total));

    return(
        <Header pageName={`Customer Order`}>
            <Back path="/order"/>
            <div className="flex items-center">
                <span className="text-lg mr-6"><strong>Total</strong> : <strong className="text-red-500">{totalPurchase.toLocaleString()}</strong></span>
                <DropdownComponent changeSortTypes={(event, types) => changeSortTypes(event, types)} sortTypes={sortTypes} />
            </div>
            <Card 
            filteredItems={sortingTypes.length <= 0 ? filterProduct : sortingTypes} 
            onClick={(event : React.MouseEvent<HTMLLIElement, MouseEvent>, id : string) => redirectRequest(event, id)}/>
        </Header>        
    )
}

export default withRouter(CustomerOrders);          