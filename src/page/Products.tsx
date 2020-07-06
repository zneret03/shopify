import React, {useState} from 'react';
import Header from '../components/private/Header'
import {Table, Tag, Space, Pagination, Drawer, Divider} from 'antd';
const Products = () => {

    const columns = [
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text : string) => <a>{text}</a>,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Product Name',
          dataIndex: 'products',
          key: 'products',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (status : any) => (
            <>
              {status.map((status : any) => {
                let color = status.length > 5 ? 'geekblue' : 'green';
                if (status === 'unpaid') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={status}>
                    {status.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (record : any) => (
            <Space size="middle">
              <a>Update {console.log(record.name)}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

      const data = [
        {
          key: '1',
          image: 'John Brown',
          title: 32,
          products: 'New York No. 1 Lake Park',
          price : '₱1,400',
          status: ['paid'],
        },
        {
          key: '2',
          image: 'Jim Green',
          title: 42,
          products: 'London No. 1 Lake Park',
          price : '₱1,400',
          status: ['unpaid'],
        },
        {
          key: '3',
          image: 'Joe Black',
          title: 32,
          products: 'Sidney No. 1 Lake Park',
          price : '₱1,400',
          status: ['paid'],
        },
        {
            key: '3',
            image: 'Joe Black',
            title: 32,
            products: 'Sidney No. 1 Lake Park',
            price : '₱1,400',
            status: ['paid'],
          }
      ];

      const pageSize : number = 6;

      //getting data
      const getData = (current : number, pageSize : number) => {
          return  data.slice(current - 1, pageSize);
      }

      //custom pagination
      const MyPagination = ({total, onChange, current} : any) => {
            return(
                <Pagination 
                    onChange={onChange}
                    total={total}
                    current={current}
                    pageSize={pageSize}
                />
            )
      }

      const initialState = {
        product : '',
        title : '',
        purpose : '',
        price : 0
    }

    const errorState = {
        errorProduct : '',
        errorTitle : '',
        errorPurpose : '',
        errorPrice : ''
    }

      
      const [current, setCurrent] = useState<number>(1);
      const [openDrawer, setOpenDrawer] = useState<boolean>(false);

      const closeDrawer = (event : any) => {
          event.preventDefault();
          if(openDrawer === true) return setOpenDrawer(false);
      }

      const openDrawerr = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault();
          if(openDrawer !== !openDrawer) return setOpenDrawer(true);
      }

      const [{product, title, purpose, price}, setState] = useState(initialState);

      const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name] : value}));
      }

      const [{errorProduct, errorTitle, errorPurpose, errorPrice}, setErrorState] = useState(errorState);

      const isValidate = () => {
         let productError = '';
         let titleError = '';
         let purposeError = '';

        if(!errorProduct){
            productError = 'Please Dont leave the filed blank';
        }

        // if(productError){
        //     setErrorState<>({ productError });
        // }

        return true
      }

      const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid  = isValidate();

        if(isValid){
            console.log({product, title, purpose, price});
        }
        
      }

    return(
        <>
           <Header pageName={'Products'} welcome={'Welcome to Shopify, Ian'}>
               <div className="mb-2 flex justify-end items-center">
                   <button className="mr-4 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white" onClick={(event) => openDrawerr(event)}>Add Product</button>
                    <MyPagination 
                        total={data.length}
                        current={current}
                        onChange={setCurrent}
                    />
               </div>
               <div>
                    <Table 
                    columns={columns} 
                    dataSource={getData(current, pageSize)}
                    pagination={false}/>
                </div>
            <div>
                <Drawer 
                title={'Products Information'}
                onClose={(event) => closeDrawer(event)}
                visible={openDrawer}
                bodyStyle = {{ paddingBottom : 80}}
                width = { 300 }>
                 <form action="" onSubmit={(event) => onSubmit(event)}>
                     <div className="mb-4">
                         <span>Product Name</span>
                         <input value={product} 
                         name="product" onChange={(event) => onChange(event)} 
                         className="border w-full py-1 px-3 rounded" 
                         type="text"/>
                         <div className="text-red-500 mt-1 text-xs">{errorProduct}</div>
                     </div>
                     <div className="mb-4">
                         <span>Title</span>
                        <input value={title} 
                        name="title" 
                        onChange={(event) => onChange(event)} 
                        className="border w-full py-1 px-3  rounded" 
                        type="text"/>
                        <div>{errorTitle}</div>
                     </div>
                     <div className="mb-4">
                         <span>Purpose</span>
                         <input value={purpose} 
                         name="purpose" onChange={(event) => onChange(event)} 
                         className="border w-full py-1 px-3  rounded" 
                         type="text"/>
                         <div>{errorPurpose}</div>
                     </div>
                     <div className="mb-4">
                         <span>Price</span>
                        <input value={price} 
                        name="price" 
                        onChange={(event) => onChange(event)} 
                        className="border w-full py-1 px-3  rounded" 
                        type="number"/>
                        <div>{errorPrice}</div>
                     </div>
                    <div className="flex justify-end items-end">
                        <button className="px-4 py-1 border rounded-sm hover:border-red-500 hover:text-red-500 mr-4" 
                        onClick={(event) => closeDrawer(event)}>
                        Cancel
                        </button>
                        <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">
                        Submit
                        </button>
                    </div>  
                 </form>   
                </Drawer>
            </div>
           </Header>    
        </>
    )
}

export default Products;