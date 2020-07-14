import React, {useState, useEffect} from 'react';
import {Divider} from 'antd';
import Header from './Header';
import {app} from '../../config/firebase';
import {ArrowLeft} from 'react-feather';
import {Link} from 'react-router-dom';
import axios from 'axios';

const initialState = {
    product : '',
    title : '',
    purpose : '',
    price : 0,
    quantity : 0
}

const EditProduct: React.SFC = (props : any) => {

      //input onChange
      const [{product, title, purpose, price, quantity}, setState] = useState(initialState);
      const params = new URLSearchParams(props.location.search);
      const id = params.get('id');

      const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name, defaultValue} = event.target;
        setState(prevState => ({...prevState, [name] : defaultValue}));
      }

      const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios({
           method : 'post',
           url : `https://us-central1-shopify-c74df.cloudfunctions.net/updateProduct/api/update:${id}`,
           data : {
               product,
               title,
               purpose,
               price,
               quantity
           }
        }).then(() => {
            console.log('successfully updated');
        }).catch((error) => {
            console.log(error.message); 
        })

        console.log({product,title,purpose,price,quantity});
      } 

      const [item, setItem] = useState<object[]>([]);

      useEffect(() => {
        const getProductdata = async() => {
            const items_array : object[] = [];
            if(id){
                const document = app.firestore().collection('product').doc(id);
                const item = await document.get();
                const result = item.data();
                result && items_array.push(result);
            }
            setItem(items_array);
        }
        getProductdata();
      }, [props.location.search])

      if(item.length > 0){
        item.map((productState : any) => {
            initialState['product'] = productState.product;
            initialState['title'] = productState.title;
            initialState['purpose'] = productState.purpose
            initialState['price'] = productState.price;
            initialState['quantity'] = productState.quantity
        });
      }

      if(item.length <= 0) {
          return <div className="h-screen w-screen flex items-center justify-center">Loading</div>
      }

    return(
        <>
           <Header pageName={'Edit Products'}>
               <div className="flex">
                <div className="w-1/2">

                <div className="flex mb-4">
                <i className="mr-2"><ArrowLeft size="20"/></i>
                    <Link to="/dashboard/products/viewProducts">
                        <span className="uppercase tracking-widest underline font-bold text-gray-700">Back</span>
                    </Link>
                </div>
                    <form onSubmit={(event) => onSubmit(event)}>
                        <div className="grid sm:grid-cols-2 sm:gap-3">
                            <div className="mb-3">
                                <span>Product Name</span>
                                <input defaultValue={product} 
                                required
                                name="product" onChange={(event) => onChange(event)} 
                                className="border w-full py-1 px-3 rounded" 
                                type="text"/>
                            </div>
                            <div className="mb-3">
                                <span>Title</span>
                                <input defaultValue={title} 
                                required
                                name="title" 
                                onChange={(event) => onChange(event)} 
                                className="border w-full py-1 px-3  rounded" 
                                type="text"/>
                                </div>
                        </div>
                        <div className="mb-3">
                            <span>Purpose</span>
                            <input defaultValue={purpose} 
                            required
                            name="purpose" onChange={(event) => onChange(event)} 
                            className="border w-full py-1 px-3  rounded" 
                            type="text"/>
                            </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-3">
                                <span>Price</span>
                                <input defaultValue={price} 
                                required
                                pattern="[0-9]"
                                name="price" 
                                onChange={(event) => onChange(event)} 
                                className="border w-full py-1 px-3  rounded" 
                                type="number"/>
                            </div>
                            <div className="mb-3">
                                <span>Quantity</span>
                                <input defaultValue={quantity} 
                                required
                                pattern="[0-9]"
                                name="quantity" 
                                onChange={(event) => onChange(event)} 
                                className="border w-full py-1 px-3  rounded" 
                                type="number"/>
                            </div>
                        </div>
                        <Divider />
                        <div className="flex justify-end items-end">
                            <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">Update</button>
                        </div>  
                    </form>   
        </div>
        <div className="w-1/2 flex justify-center">
            {item.map((product : any, index) => (
                <div className="border mt-5 mr-2" key={index}>
                      <div className="py-6 px-12 bg-gray-200">
                            <img className="sm:w-64 sm:h-64 object-contain mx-auto" src={product.imageUrl} alt=""/>
                      </div>
                      <div className="px-4 py-2 font-segoe-UI">
                      <span className="block text-xs text-gray-600 mb-4">{product.purpose}</span>
                      <span className="block text-xs uppercase tracking-wide mb-1">{product.product}</span>
                      <span className="text-black text-gray-800">₱{product.price}</span>
                      </div>
                </div>
            ))}
        </div>
        </div>
            </Header>
        </>
    )
}

export default EditProduct;