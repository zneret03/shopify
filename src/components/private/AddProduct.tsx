import React, {useState, useContext} from 'react';
import {Divider} from 'antd';
import {useDropzone} from 'react-dropzone';
import Header from './Header';
import {app} from '../../config/firebase';
import { AuthContext } from '../../auth/AuthProvider';
import axios from 'axios';

const initialState = {
    product : '',
    title : '',
    purpose : '',
    price : 0,
    quantity : 0
}


const AddProduct: React.SFC = () => {

    const context = useContext(AuthContext);
    const data : object[] = [];
    data.push(context);

    const {
        acceptedFiles, 
        getRootProps, 
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject
    } = useDropzone({accept : 'image/jpeg, image/png'});

    const files : any = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size}
        </li>
    ));


      //input onChange
      const [{product, title, purpose, price, quantity}, setState] = useState(initialState);
      const [popupText, setPopUpText] = useState<boolean>(false);

      const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
      }

      //get UserUid
      const getUserUId = () => {
        return new Promise((resolve, reject) => {
            if(data.length > 0){
                data.forEach((user : any) => {
                    resolve(user.uid);
                 })
            }else{
                reject({
                    message : 'empty array'
                })
            }
        })
     }

      const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        getUserUId().then((data) => {
            acceptedFiles.map(async file => {
                if(file){
                    let today = new Date();
                    let date = `${today.getMonth()} ${today.getDay()}, ${today.getFullYear()}`

                     const storageRef = app.storage().ref();  
                     const fileRef = storageRef.child(file.name);
                     await fileRef.put(file);
                     const imageUrl = await fileRef.getDownloadURL();

                     axios({
                         method : 'post',
                         url : 'https://us-central1-shopify-c74df.cloudfunctions.net/addProduct/api/productSave',
                         headers : {'Access-Control-Allow-Origin' : '*'},
                         data : {
                            uid : data,
                            product : product,
                            title : title,
                            purpose : purpose,
                            price : price, 
                            quantity : quantity,
                            imageUrl : imageUrl,
                            date : date
                         } 
                     }).then(() => {
                        setPopUpText(true);
                     }).catch((error) => {
                         console.log(error.message);
                     })
                }
            });
        }).catch((error) =>{
            console.log(error.message);
        })
        
      } 

    return(
        <>
           <Header pageName={'Add Products'}>
                <div>
                <form action=""  onSubmit={(event) => onSubmit(event)}>
                    <div className="grid sm:grid-cols-3 sm:gap-3">
                        <div className="mb-3">
                            <span>Product Name</span>
                            <input value={product} 
                            required
                            name="product" onChange={(event) => onChange(event)} 
                            className="border w-full py-1 px-3 rounded" 
                            type="text"/>
                        </div>
                        <div className="mb-3">
                            <span>Title</span>
                        <input value={title} 
                        required
                        name="title" 
                        onChange={(event) => onChange(event)} 
                        className="border w-full py-1 px-3  rounded" 
                        type="text"/>
                        </div>

                        <div className="mb-3">
                        <span>Purpose</span>
                        <input value={purpose} 
                        required
                        name="purpose" onChange={(event) => onChange(event)} 
                        className="border w-full py-1 px-3  rounded" 
                        type="text"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-3">
                            <span>Price</span>
                            <input value={price} 
                            required
                            pattern="[0-9]"
                            name="price" 
                            onChange={(event) => onChange(event)} 
                            className="border w-full py-1 px-3  rounded" 
                            type="number"/>
                        </div>
                        <div className="mb-3">
                            <span>Quantity</span>
                            <input value={quantity} 
                            required
                            pattern="[0-9]"
                            name="quantity" 
                            onChange={(event) => onChange(event)} 
                            className="border w-full py-1 px-3  rounded" 
                            type="number"/>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <div className="flex items-center justify-center bg-gray-200 py-12 border-dashed border-4 cursor-pointer">
                                <input {...getInputProps()}/>
                                {!isDragActive && (<p className="text-center">Drag 'n' drop some image here, or click to select files</p>)}
                                {isDragReject && (<p>Unable File</p>)}
                                {isDragAccept && (<p>All image will be accepted</p>)} 
                            </div>
                            <div className="mt-3">
                                <p 
                                className={`${popupText ? 'block' : 'hidden'} text-center py-1 bg-green-500 rounded text-white`}>
                                Successfully Inserted
                                </p>
                            </div>
                        </div>
                        <aside className="mt-2">
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </div>
                <Divider />
                <div className="flex justify-end items-end">
                    <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">Submit</button>
                </div>  
            </form>   
                </div>
            </Header>
        </>
    )
}

export default AddProduct;