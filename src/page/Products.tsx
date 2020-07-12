import React, {useState, useContext} from 'react';
import Header from '../components/private/Header'
import {Table, Space, Pagination} from 'antd';
import {ProductContext} from '../Context/ProductProvider';

const Products = () => {


    const {items} = useContext(ProductContext);

    console.log(items);
    const columns = [
        {
          title: 'Unique identification',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Product Name',
          dataIndex: 'product',
          key: 'product',
        },
        {
          title: 'Purpose',
          dataIndex: 'purpose',
          key: 'purpose',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
        {
          title: 'Action',
          key: 'action',
          render: (record : any) => (
            <Space size="middle">
              <span>Update {record.name}</span>
              <span>Delete {record.name}</span>
            </Space>
          ),
        },
      ];

      const pageSize : number = 6;

      //getting data
      const getData = (current : number, pageSize : number) => {
          return  items.slice(current - 1, pageSize);
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

    return(
        <>
           <Header pageName={'Products'}>
               <div className="mb-2 flex justify-end">
                    <MyPagination 
                        total={items.length}
                        current={current}
                        onChange={setCurrent}
                    />
               </div>
               <div>
                    <Table 
                    className="overflow-auto"
                    columns={columns} 
                    dataSource={getData(current, pageSize)}
                    pagination={false}/>
                </div>
           </Header>    
        </>
    )
}

export default Products;