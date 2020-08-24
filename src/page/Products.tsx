import React, {useState, useContext} from 'react';
import {Table, Space, Tag, Input, Popconfirm} from 'antd';
import {ProductContext} from '../Context/ProductProvider';
import {Edit3, Trash2} from 'react-feather';
import {withRouter} from 'react-router-dom';
import {app} from '../config/firebase';
import axios from 'axios';

//Component
import Header from '../components/private/Header'
import {MyPagination} from '../components/private/MyPagination';

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

    //** to avoid data loss when parsing data
    const [data, setDataSource] = useState(items);

    //** wait data to arrive
    const getItem = () => {
      return new Promise((resolve, reject) => {
        if(items.length > 0){
          resolve(items);
        }else{
          reject('empty item')
        }
      })
    }

    //** if it fail fetch re-fetch data
    getItem().then((data : any) => {
       if(data){
          setDataSource(data);
       }
    }).catch((error) => {
      console.log(error.message);
    })

    //** send request to back end
    const httpRequest = (config : any) => {
      const {id, imageUrl, file} = config;

      axios({
        method : 'delete',
        url : `https://us-central1-shopify-c74df.cloudfunctions.net/deleteProducts/api/deleteProduct/${id}`,
        headers : {'Access-Control-Allow-Origin' : '*'}
      }).then(() => {
        const storageRef = app.storage().refFromURL(imageUrl);
        storageRef.delete().then(()=> {
            const storageRef = app.storage().ref();
            const deleteRef = storageRef.child('/' + file);
            deleteRef.delete();
          }).catch((error) => {
            console.log(error.message);
          });
      }).catch((error) => {
        console.log(error.message)
      })
    }

    //** Delete Table Data
    const getDeleteId = async(event : any, id : any, imageUrl : string, file: string) => {
      event.preventDefault();
      if(file){
        const config: any = {id, imageUrl, file};
        httpRequest(config);
      }
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
              <Popconfirm title="Do you want to delete?" onConfirm={(event) => getDeleteId(event, items.id, items.imageUrl, items.fileName)}>
              <button><Trash2 className="text-red-700" size="20"/></button>
              </Popconfirm>
            </Space>
          ),
        },
      ];

    //** Data showed to the client
    const dataShowed : number = 5;

    const [current, setCurrent] = useState<number>(1);
    
    //** get current data;
    const indexLastData = current * dataShowed;
    const indexOfFirstData = indexLastData - dataShowed; 
    const currentData : object[] = data.slice(indexOfFirstData, indexLastData);

    //** set spinner if data not arrives
    if(currentData.length <= 0){
      return <div className="h-screen w-screen flex items-center justify-center">No data to be display :(</div>
    }

    return(
        <>
           <Header pageName={'Products'}>
             <div className="mb-3 text-right">
               <Input.Search 
               allowClear
               className="max-w-xs" 
               placeholder="Search by product name"
               onSearch={nameSearch => (
                    nameSearch ? (
                      setDataSource(data.filter((item : any) => 
                      item.product.includes(nameSearch)))
                    ) : (
                      setDataSource(items)
                    )
                )}/>
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
                        total={data.length}
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