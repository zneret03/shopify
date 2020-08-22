import React, {useContext, useState} from 'react';
import {Divider} from 'antd';
import Back from '../utils/Back';
import {CartContext} from '../Context/CartProvider';
import {withRouter} from 'react-router-dom';
import {pendingItems} from '../utils/FilteredItems';
import {app} from '../config/firebase';
import {Link} from 'react-router-dom';
interface PropsType {
    history : any
}

const Cart : React.SFC<PropsType> = ({history}) => {

    const {cartItems} = useContext(CartContext);
    const [subTotal, setSubTotal] = useState(0);
    const pending = pendingItems(cartItems);

    const totalAmount = () => {
        return new Promise((resolve, reject)=>{
            if(cartItems){
                    const total = pending.reduce((a : any, b : any) => a + b.Subtotal, 0);
                    resolve(total);
            }else{  
                reject('No amount gettting');
            }
        })
    }

    
    totalAmount().then((amount : any)=>{
        if(amount > 0){
            setSubTotal(amount);
        }else{
            setSubTotal(0);
        }
    }).catch((error) => {
        setSubTotal(0);
        console.log(error.message);
    });

    //Click checkout button redirect to Checkout form
    const openCheckOut = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(subTotal){
            history.push('/cart/checkOut');
        }
    }

    //Delete items
    const deleteCartItems = async(event: React.MouseEvent<HTMLButtonElement>, id : string) => {
        event.preventDefault();

        try {
            if(id){
                const document = app.firestore().collection('transaction').doc(id);
                await document.delete();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <>
        <div className="container mx-auto px-3">
            <div className="md:flex md:justify-between py-8">
                    <div>
                        <Back path="/shop"/>
                        <span className="text-2xl text-black">Shopping Bag</span>
                        <div className="mt-6">
                            <div className="grid grid-rows gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {pending.map((items : any, index : number) => (
                                    <div className={`${items.status.color === "#ff4444" ? 'block' : 'hidden'} border`} key={index}>
                                        <div className="bg-gray-200 py-6 px-6 relative">
                                            <div className="absolute top-0 right-0 px-2">
                                                <button onClick={(event) => deleteCartItems(event, items.id)}>x</button>
                                            </div>
                                            <img className="w-40 h-40 object-contain mx-auto" src={items.imageUrl} alt=""/>
                                        </div>
                                        <div className="px-4 py-2 font-segoe-UI">
                                        <div className="flex justify-between">
                                            <span className="block text-xs text-gray-600 mb-4">{items.purpose}</span>
                                            <div className="rounded-full bg-gray-500 h-2 w-2 mt-2" style={{backgroundColor: items.status.color}}></div>
                                        </div>
                                            <span className="block text-xs   text-gray-600 uppercase tracking-wide mb-1">{items.productName}</span>
                                            <div className="flex items-center justify-between">
                                                <span className="text-black text-xs text-gray-800">₱{items.Subtotal.toLocaleString()}</span>
                                                <span className="block text-xs text-gray-800 uppercase">{items.gender}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {pending.length <= 0 && (
                            <div className="text-center md:absolute md:inset-x-0">
                                <span className="block mb-4">Your Shopping bag is empty</span>
                                <Link to="/shop" 
                                className="uppercase tracking-wide font-bold border py-2 px-8 mt-2 bg-gray-900 text-white hover:text-white hover:bg-gray-700 rounded">
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/4 w-full md:ml-4 md:mt-0 mt-6 sm:mt-6">
                        <span className="text-2xl text-black">Product Summary</span>
                        <Divider />
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₱{subTotal.toLocaleString()}</span>
                            </div>
                       <div className="text-center mt-10">
                        <button onClick={(event) => openCheckOut(event)}
                        className="border py-3 w-full rounded-full text-lg hover:bg-gray-300 hover:text-white">
                            Check out
                        </button>
                       </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default withRouter(Cart);