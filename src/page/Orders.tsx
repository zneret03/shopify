import React, {useContext, useState} from 'react';
import {OrderContext} from '../Context/OrderProvider';
import {Table, Space, Input,Popconfirm} from 'antd';
import {ShoppingCart, Edit, Trash2} from 'react-feather';
// import {AuthContext} from '../auth/AuthProvider';
// import {filteredProduct} from '../utils/FilteredItems';
import Headers from '../components/private/Header';
import {MyPagination} from '../components/private/MyPagination';
import {onSearch} from '../utils/FilteredItems';

interface onProps {
  history : any
}

const Orders : React.SFC<onProps> = ({history}) => {

    const {items} = useContext(OrderContext);
    //const currentUser : any = useContext(AuthContext);

    const [searchFilter, setSearchFilter] = useState(null);
     //** Reminders */
     //* customer Order authentication

     const customerOrders = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, items : any) => {
        event.preventDefault();
        if(items){
          history.push(`/order/customerOrders?id=${items.id}`);
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
          title: 'Date',
          dataIndex: 'date_created',
          key: 'date_created',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        // {
        //     title : 'Gender',
        //     dataIndex : 'gender',
        //     key: 'gender',
        //     render : (gender : string ) => {
        //         let color = gender.length > 3 ?  'geekblue' : 'green'
        //         if(gender === 'Kids'){
        //           color = 'volcano'
        //         }
        //         return(
        //            <Tag color={color} key={gender}> 
        //               {gender.toUpperCase()}
        //            </Tag>
        //         )
        //     }
        //   },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
        },
        {
          title : 'Region',
          dataIndex : 'region',
          key: 'region'
        },
        {
            title : 'Subtotal',
            dataIndex : 'subTotal',
            key: 'subTotal'
        },
        {
            title : 'Zipcode',
            dataIndex : 'zipcode',
            key: 'zipcode'
        },
        {
          title: 'Action Controls',
          key: 'action',
          render: (items : any) => (
            <Space size="middle" key="action">
                <button ><Edit className="text-green-500" size="20"/></button>
              <button onClick={(event) => customerOrders(event, items)}><ShoppingCart className="text-blue-700" size="20"/></button>
              <Popconfirm title="Do you want to delete?">
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
    const currentData : object[] = items.slice(indexOfFirstData, indexLastData);

    //** set spinner if data not arrives
    if(currentData.length <= 0){
      return <div className="h-screen w-screen flex items-center justify-center">Please wait...</div>
    }

    return(
        <Headers pageName={'Customer Order'}>
            <div>
              <div className="mb-3 text-right">
                <Input.Search
                  allowClear
                  className="max-w-xs"
                  placeholder="Search by firstname"
                  onSearch={nameSearch => {
                    const sea = onSearch(nameSearch, items)
                    setSearchFilter(sea);
                    }
                  }
                />
              </div>
                <Table key="table"
                className="overflow-auto"                                       
                    columns={columns} 
                    rowKey={currentData => currentData.id}                                                                                  
                    dataSource={searchFilter === null ? currentData : searchFilter}
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
        </Headers>
    );
}

export default Orders;