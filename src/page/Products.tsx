import React, {useState, useContext} from 'react';
import {Table, Space, Tag, Input} from 'antd';
import {ProductContext} from '../Context/ProductProvider';
import {Edit3, Trash2} from 'react-feather';
import {withRouter} from 'react-router-dom';

//Component
import Header from '../components/private/Header'
import {MyPagination} from '../components/private/MyPagination';

interface Props {
  history : any
}

const Products : React.SFC<Props> = ({history}) => {

    const {items} = useContext(ProductContext);

    const [search, setSearch] = useState('');
    // const [data, setData] = useState(items);

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      // const {value} = event.target;

      // setSearch(value);
      // const filteredTable = data.filter((entry : any) => {
      //   console.log(entry.product);
      // });

      // setData(filteredTable);
    }

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

    //Data showed to the client
    const dataShowed : number = 5;

    const [current, setCurrent] = useState<number>(1);
    
    // get current data;
    const indexLastData = current * dataShowed;
    const indexOfFirstData = indexLastData - dataShowed; 
    const currentData = items.slice(indexOfFirstData, indexLastData);


    return(
        <>
           <Header pageName={'Products'}>
             <div className="mb-3 text-right">
               <Input className="max-w-xs" 
               placeholder="Search by..."
               name="search"
               value={search}
               onChange={(event) => onChange(event)}/>
             </div>
               <div>
                    <Table 
                    className="overflow-auto"
                    columns={columns} 
                    dataSource={currentData}
                    pagination={false}
                    />
                </div>
                <div className="mt-2 flex justify-center">
                    <MyPagination 
                        total={items.length}
                        current={current}
                        onChange={setCurrent}
                        pageSize={dataShowed}
                    />
               </div>
           </Header>    
        </>
    )
}

export default withRouter(Products);