import React, {createContext, useEffect ,useState} from 'react';
import NoRouteMatch from '../page/404';
import {Spin} from 'antd';
interface Props { 
    children : React.ReactNode
}

interface IContext {
    items : object[]
}

const ProductContext = createContext({} as IContext);

const ProductProvider: React.SFC<Props> = ({children}) => {

    const [error, setError] = useState({type : 200, active : false});
    const [items, setItems] = useState<object[]>([]);

    useEffect(() => {
        const getItems = async() =>{
            await fetch('https://us-central1-shopify-c74df.cloudfunctions.net/getProduct/api/getProduct')
            .then((response) => {
                if(response.status === 404){
                    setError({type : 404, active: true});
                }

                if(response.status === 403){
                    setError({type : 403, active: true});
                }

                return response.json();
            }).then((data) => {
                data && setItems(data);
            }).catch((error) => {
                console.log(error.message);
            })
        }

        getItems();
    },[])

    if(items.length <= 0){
        return <div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>
    }

    if(error.active){
        return <NoRouteMatch />
    }


    return(
        <ProductContext.Provider value={{items}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext};