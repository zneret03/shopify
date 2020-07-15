import React, {createContext, useEffect ,useState} from 'react';
import {Spin} from 'antd';
import { app } from '../config/firebase';
interface Props { 
    children : React.ReactNode
}

interface IContext {
    items : object[]
}

const ProductContext = createContext({} as IContext);

const ProductProvider: React.SFC<Props> = ({children}) => {

    const [items, setItems] = useState<object[]>([]);

    useEffect(() => {
            // await fetch('https://us-central1-shopify-c74df.cloudfunctions.net/getProduct/api/getProduct')
            // .then((response) => {
            //     if(response.status === 404){
            //         setError({type : 404, active: true});
            //     }

            //     if(response.status === 403){
            //         setError({type : 403, active: true});
            //     }

            //     return response.json();
            // }).then((data) => {
            //     data && setItems(data);
            // }).catch((error) => {
            //     console.log(error.message);
            // })
            const document = app.firestore();
            return document.collection('product').onSnapshot((onsnapshot) => {
                const productData : object[] = []
                onsnapshot.docs.forEach((item : any) => {
                    productData.push({...item.data(), id : item.id});
                })
                setItems(productData);
            });
    },[])

    if(items.length <= 0){
        return <div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>
    }

    return(
        <ProductContext.Provider value={{items}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext};