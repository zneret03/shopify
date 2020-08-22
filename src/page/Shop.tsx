import React, {useContext, useState, /*useEffect*/} from 'react';
import {ProductContext} from '../Context/ProductProvider';
// import {filterItems} from '../utils/FilteredItems';
import Card from '../utils/Card';
//components
import Back from '../utils/Back';
import Filters from './Filters';

const Shop:React.SFC = (props : any) => {

    const {items} = useContext(ProductContext);
    const [search, setSearch] = useState<string>('');
    // const [filter, setFilter] = useState([]);
    
    //*Get query string
    const params = new URLSearchParams(props.location.search);
    const gender = params.get('gender');


    let filteredItems = items.filter((item : any) => {
        return item.product.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    // useEffect(() => {
    //     if(gender !== null){
    //         const filterGender = filterItems(items, gender);
    //         setFilter(filterGender);
    //     }else{
    //         setFilter(filteredItems);
    //     }
    // },[])          


    return(
        <div className="font-mono text-black">
            <div className="container mx-auto px-6 py-8">
                <Back path="/"/>
                <div className="my-8">
                    <span className="uppercase text-3xl font-bold">{gender ? (gender) : ('all products')}</span>
                    <span className="ml-3 text-gray-500">[{filteredItems.length}]</span>
                </div>
                <div className="text-right lg:flex lg:items-center lg:justify-between">
                    <div className="mt-3">
                        <button className="px-5 block bg-gray-300 rounded-sm text-sm cursor-default">{gender}</button>
                    </div> 
                    <input type="text" 
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="border sm:mb-4 sm:w-full lg:w-1/4 sm:py-2 lg:py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                    placeholder="Search Product Name"/>
                </div>
                <Filters />
                <Card filteredItems={filteredItems}/>
                </div>
            </div>
    )
}

export default Shop;