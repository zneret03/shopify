import React, {useContext, useState, useEffect} from 'react';
import {ProductContext} from '../Context/ProductProvider';
import {filterItems} from '../utils/FilteredItems';
import Card from '../utils/Card';
import {withRouter} from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';

//** components
import Back from '../utils/Back';
import Filters from '../components/public/Filters';

const Shop:React.SFC = (props : any) => {

    const {items} = useContext(ProductContext);
    // **const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState([]);
    
    // **Get query string
    const params : any = new URLSearchParams(props.location.search);
    const gender : string | null = params.get('gender');
    const productName : string | null = params.get('productName');

    // **filter items return if product name is null
    let filteredItems = items.filter((item : any) => {
        if(productName){
            return item.product.toLowerCase().indexOf(productName.toLowerCase()) !== -1;
        }else{
            return item;
        }
    });

    const [badge, setBadge] = useState(true);

    // **badge
    const hideBadge = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if(badge){
            setBadge(false);
            props.history.push('/shop');                                                
        }
        gender && setBadge(true);
    }

    // **render if items and gender changes
    useEffect(() => {
        if(gender){
            const filterGender = filterItems(items, gender);
            setFilter(filterGender);
        }else{
            setFilter(filteredItems);
        }

    },[gender, items]);


    // **render if productName changes
    useEffect(() => {
       productName && setFilter(filteredItems);
    }, [productName])

    return(
        <div className="font-mono text-black">
            <div className="container mx-auto px-6 py-8">
                <Back path="/"/>
                <div className="my-8">
                    <span>
                        <ReactTypingEffect className="uppercase text-3xl font-bold" 
                        speed={100}
                        eraseDelay={500}
                        typingDelay={200}
                        text={gender ? (`$~${gender} Merch`) : ('$~all products')}/>
                    </span>
                    <span className="ml-3 text-gray-500">[{filter.length}]</span>
                </div>
                <div className="text-right lg:flex lg:items-center lg:justify-between">
                    <div className="mb-3">
                        <button onClick={(event) => hideBadge(event)}
                        className={`${badge ? 'block' : 'hidden' } px-5 block bg-gray-300 rounded-sm text-sm hover:bg-red-500 hover:text-white`}>
                            {gender}
                        </button>
                    </div> 
                    {/* <input type="text" 
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="border sm:mb-4 mb-2 py-2 sm:w-full lg:w-1/4 lg:py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                    placeholder="Search Product Name"/> */}
                </div>
                <Filters />
                <Card filteredItems={filter}/>
                </div>
        </div>
    )
}

export default withRouter(Shop);