import React, {useState, useEffect} from 'react';
import {Divider} from 'antd';
import Header from './Header';
import {app} from '../../config/firebase';
import {ArrowLeft} from 'react-feather';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';


interface productStateTypes {
    product : string,
    title : string,
    purpose : string,
    price : number,
    quantity : number,
    gender : string
}

const initialState : productStateTypes = {
    product : '',
    title : '',
    purpose : '',
    price : 0,
    quantity : 0,
    gender : ''
}

const EditProduct: React.SFC = (props : any) => {

      //input onChange
      const [{product, title, purpose, price, quantity, gender}, setState] = useState(initialState);
      const params = new URLSearchParams(props.location.search);
      const id = params.get('id');

      //get input onChange
      const onChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
      }

      const [message, setMessage] = useState({status : false, message : '', loading : false});

      const loadSpinner = () =>{
            setMessage({status : false, message : '', loading : true});
      }
      
      //update functions
      const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const items : productStateTypes = {
            product,
            title,
            purpose,
            price,
            quantity,
            gender
        }

        loadSpinner();

        axios({
            method : 'put',
            url : `https://us-central1-shopify-c74df.cloudfunctions.net/updateProduct/api/update/${id}`,
            headers : {'Access-Control-Allow-Origin' : '*'},
            data : items 
        }).then(() => {
            setMessage({status : true, message : 'successfully updated', loading: false});

            setTimeout(() => {
                setMessage({status : false, message : '', loading : false});
            }, 5000)
        }).catch((error) => {
            setMessage({status : false, message : error.message, loading : false});
        })
      } 

      const [item, setItem] = useState<object[]>([]);

      useEffect(() => {
            if(id){
                const document = app.firestore().collection('product').doc(id);
                return document.onSnapshot((snapshot) => {
                    const items_array : object[] = []
                    if(snapshot){
                        items_array.push({...snapshot.data()});
                        setItem(items_array);
                    }
                });
            }
      }, [id])

      //get all data and assign to each inputbox
       item && item.map((productState : any) => {
           return Object.assign(initialState, productState);
        });


      if(item.length <= 0) {
          return <div className="h-screen w-screen flex items-center justify-center">Loading</div>
      }

    return(
        <>
          {message.loading && <Loading />}
           <Header pageName={'Edit Products'}>
               <div className="md:flex">
                <div className="md:w-1/2">
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
                            <span>Gender</span>
                            {gender && (
                                   <select name="gender" className="border w-full py-2 px-3 bg-white rounded" 
                                   value={gender}
                                   onChange={(event) => onChange(event)}>
                                       <option defaultValue={gender}></option>
                                       <option value="Men">Men</option>
                                       <option value="Women">Women</option>
                                       <option value="Kids">Kids</option>
                                   </select>
                            )}  
                        </div>
                        </div>
                        {message.status ? (
                            <div className="bg-green-400 w-full rounded text-center">
                                <p className="py-1 text-white">{message.message}</p>
                            </div>
                        ) : null}
                        <Divider />
                        <div className="flex justify-end items-end">
                            <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">Update</button>
                        </div>  
                    </form>   
                </div>
                    <div className="md:w-1/2 flex md:justify-center justify-center">
                        {item && item.map((product : any, index) => 
                        ( 
                            <div className="border mt-5 mr-2" key={index}>
                                <div className="py-6 px-12 bg-gray-200">
                                        <img className="sm:w-64 sm:h-64 object-contain mx-auto" src={product.imageUrl} alt=""/>
                                </div>
                                <div className="px-4 py-2 font-segoe-UI">
                                <span className="block text-xs text-gray-600 mb-4">{product.purpose}</span>
                                <span className="block text-xs uppercase tracking-wide">{product.product}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-black text-xs text-gray-800">₱{product.price}</span>
                                    <span className="block text-xs text-gray-600 uppercase">{product.gender}</span>
                                </div>
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