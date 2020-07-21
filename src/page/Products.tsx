import React, {useState, useContext, useEffect} from 'react';
import {Table, Space, Tag, Input} from 'antd';
import {ProductContext} from '../Context/ProductProvider';
import {Edit3, Trash2} from 'react-feather';
import {withRouter} from 'react-router-dom';
import swal from 'sweetalert2';
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

    const [data, setDataSource] = useState<object[]>(items);

    const getUdateId = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, id : string) => {
      event.preventDefault();
      if(id){
        history.push(`/dashboard/products/EditProducts?id=${id}`); 
      }
    }

    const httpRequest = (config : any) => {
      const {id, imageUrl, result} = config;
      axios({
        method : 'delete',
        url : `https://us-central1-shopify-c74df.cloudfunctions.net/deleteProducts/api/deleteProduct/${id}`,
        headers : {'Access-Control-Allow-Origin' : '*'}
      }).then(() => {
        const storageRef = app.storage().refFromURL(imageUrl);
        storageRef.delete().then(()=> {
          if(result.value){
            swal.fire({
              position : 'center',
              icon : 'success',
              title: 'Successfully Deleted :)'
            });
          }
          }).catch((error) => {
            console.log(error.message);
          });
      }).catch((error) => {
        console.log(error.message)
      })
    }

    const getDeleteId = async(event : React.MouseEvent<HTMLButtonElement, MouseEvent>, id : string, imageUrl : string) => {
      event.preventDefault();
      swal.fire({
        position : 'center',
        icon : 'warning',
        title : 'Are you sure?',
        text : 'you wont able to revert this!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showCancelButton : true
      }).then((result)=>{
          const config: any = {id, imageUrl, result};
          httpRequest(config);
      })
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
              <button onClick={(event) => getDeleteId(event, items.id, items.imageUrl)}><Trash2 className="text-red-700" size="20"/></button>
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
    const currentData : object[] = data.slice(indexOfFirstData, indexLastData);

    return(
        <>
           <Header pageName={'Products'}>
             <div className="mb-3 text-right">
               <Input.Search 
               allowClear
               className="max-w-xs" 
               enterButton
               placeholder="Search by product name"
               onSearch={nameSearch => (
                    nameSearch ? (
                      setDataSource(data.filter((product : any) => 
                      product.product.includes(nameSearch)))
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