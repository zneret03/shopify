import React, {createContext, useEffect ,useState} from 'react';
import { app } from '../config/firebase';
interface Props { 
    children : React.ReactNode
}

interface IContext {
    items : object[]
}

const OrderContext = createContext({} as IContext);

const OrderProvider: React.SFC<Props> = ({children}) => {

    const [items, setItems] = useState<object[]>([]);

    useEffect(() => {
        const document = app.firestore();
        return document.collection('customerInformation').onSnapshot((onsnapshot) => {
            const customerInformationData : object[] = []
            onsnapshot.docs.forEach((item : any) => {
                customerInformationData.push({...item.data(), id : item.id});
            })
            setItems(customerInformationData);
        });
    },[])

    return(
        <OrderContext.Provider value={{items}}>
            {children}
        </OrderContext.Provider>
    )
}

export {OrderProvider, OrderContext};