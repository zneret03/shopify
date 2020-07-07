import React, {useState} from 'react';
import Modal from '../Forms/Modal';
import {Divider} from 'antd';
import {useDropzone} from 'react-dropzone';
const initialState = {
    product : '',
    title : '',
    purpose : '',
    price : 0,
    quantity : 0
}

interface Props {
    close : (event : React.MouseEvent<SVGAElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ProductForm: React.SFC<Props> = ({close}) => {


    // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    // const files = acceptedFiles.map(file => (
    //     <li key={file.name}>
    //         {file.name} - {file.size}
    //     </li>
    // ));

      //input onChange
      const [{product, title, purpose, price, quantity}, setState] = useState(initialState);

      const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
      }

      const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({product, title, purpose, price});
      } 

    return(
        <>
        <Modal close={close}>
            <div className="text-center mb-3">
                <span className="font-bold text-2xl">Product Form</span>
            </div>
            <form action="" onSubmit={(event) => onSubmit(event)}>
                <div className="mb-3">
                    <span>Product Name</span>
                    <input value={product} 
                    name="product" onChange={(event) => onChange(event)} 
                    className="border w-full py-1 px-3 rounded" 
                    required
                    type="text"/>
                </div>
                <div className="mb-3">
                    <span>Title</span>
                <input value={title} 
                name="title" 
                onChange={(event) => onChange(event)} 
                className="border w-full py-1 px-3  rounded" 
                required
                type="text"/>
                </div>
                <div className="mb-3">
                    <span>Purpose</span>
                    <input value={purpose} 
                    name="purpose" onChange={(event) => onChange(event)} 
                    className="border w-full py-1 px-3  rounded" 
                    required
                    type="text"/>
                </div>
                <div className="mb-3">
                        <span>Price</span>
                    <input value={price} 
                    pattern="[0-9]"
                    name="price" 
                    onChange={(event) => onChange(event)} 
                    className="border w-full py-1 px-3  rounded" 
                    required
                    type="number"/>
                </div>
                <div className="mb-3">
                    <span>Quantity</span>
                    <input value={quantity} 
                    pattern="[0-9]"
                    name="price" 
                    onChange={(event) => onChange(event)} 
                    className="border w-full py-1 px-3  rounded" 
                    required
                    type="number"/>
                </div>
                {/* <div {...getRootProps({className: 'dropzone'})}>
                    <input className="border" {...getInputProps()}/>
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                    </aside>
                </div> */}
            <Divider />
            <div className="flex justify-end items-end">
                <button onClick={close}
                className="px-4 py-1 border rounded-sm hover:border-red-500 hover:text-red-500 mr-4">
                    Cancel
                </button>
                <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">Submit</button>
            </div>  
            </form>   
        </Modal>
        </>
    )
}

export default ProductForm;