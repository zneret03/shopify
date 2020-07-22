import React, {createContext, useEffect ,useState} from 'react';
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
        const document = app.firestore();
        return document.collection('product').onSnapshot((onsnapshot) => {
            const productData : object[] = []
            onsnapshot.docs.forEach((item : any) => {
                productData.push({...item.data(), id : item.id});
            })
            setItems(productData);
        });
    },[])

    return(
        <ProductContext.Provider value={{items}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductProvider, ProductContext};