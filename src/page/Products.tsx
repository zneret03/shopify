import React, {useState, useContext} from 'react';
import Header from '../components/private/Header'
import {Table, Space, Pagination, Tag} from 'antd';
import {ProductContext} from '../Context/ProductProvider';
import {Edit3, Trash2} from 'react-feather';
import {withRouter} from 'react-router-dom';

interface Props {
  history : any
}

const Products : React.SFC<Props> = ({history}) => {

    const {items} = useContext(ProductContext);

    const getUdateId = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, id : string) => {
      event.preventDefault();
      if(id){
        history.push(`/dashboard/products/EditProducts?id=${id}`); 
      }
    }

    //const [remove, setRemove] = useState<string>('');

    const getDeleteId = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, id : string) => {
      event.preventDefault();
      console.log(id);
    }

    const columns = [
        {
          title: 'Unique identification',
          dataIndex: 'id',
          key: 'id',
          render : (text : string) => <span className="text-blue-500">{text}</span>
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
          title : 'Quantity',
          dataIndex : 'quantity',
          key: 'quantity'
        },
        {
          title : 'Gender',
          dataIndex : 'gender',
          key: 'gender',
          render : (gender : string ) => {
              let color = gender.length > 3 ?  'geekblue' : 'green'
              if(gender === 'Kids'){
                color = 'volcano'
              }

              return(
                 <Tag color={color} key={gender}> 
                    {gender.toUpperCase()}
                 </Tag>
              )
          }
        },
        {
          title: 'Action',
          key: 'action',
          render: (items : any) => (
            <Space size="middle" key="action">
              <button onClick={(event) => getUdateId(event, items.id)}><Edit3 className="text-blue-700" size="20"/></button>
              <button onClick={(event) => getDeleteId(event, items.id)}><Trash2 className="text-red-700" size="20"/></button>
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

export default withRouter(Products);