import React, {useState} from 'react';
import Header from '../components/private/Header'
import {Table, Tag, Space, Pagination} from 'antd';
import ProductForm from '../components/private/ProductForm';

const Products = () => {

    const columns = [
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text : string) => <span>{text}</span>,
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
              <span>Update {console.log(record.name)}</span>
              <span>Delete</span>
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


      
    const [current, setCurrent] = useState<number>(1);
    const [openModal, setModal] = useState<boolean>(false);

    const openProductModal = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if(openModal !== true) return setModal(true);
    }

    const closeProductModal = (event : React.MouseEvent<SVGAElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if(openModal === true) return setModal(false);
    }

    return(
        <>
          {openModal && <ProductForm close={(event) => closeProductModal(event)}/>}
           <Header pageName={'Products'} welcome={'Welcome to Shopify, Ian'}>
               <div className="mb-2 flex justify-end items-center">
                   <button className="mr-4 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white" onClick={(event) => openProductModal(event)}>Add Product</button>
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
           </Header>    
        </>
    )
}

export default Products;