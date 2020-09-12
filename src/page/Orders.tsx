import React, {useContext, useState} from 'react';
import {OrderContext} from '../Context/OrderProvider';
import {Table, Space, Input,Popconfirm} from 'antd';
import {ShoppingCart, Edit, Trash2} from 'react-feather';
// import {AuthContext} from '../auth/AuthProvider';
// import {filteredProduct} from '../utils/FilteredItems';
import Headers from '../components/private/Header';
import {MyPagination} from '../components/private/MyPagination';
import {onSearch} from '../utils/FilteredItems';
const Orders = () => {

    const {items} = useContext(OrderContext);
    // const currentUser : any = useContext(AuthContext);
    // const filtered = filteredProduct(items, currentUser);
    const [searchFilter, setSearchFilter] = useState(null);
     //** Reminders */
     //* Show customer orders

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
              <button ><ShoppingCart className="text-blue-700" size="20"/></button>
              <Popconfirm title="Do you want to delete?">
              <button><Trash2 className="text-red-700" size="20"/></button>
              </Popconfirm>
            </Space>
          ),
        },
      ];

      // //**Returning match search value from server */
      // const search = (value : any) => {
      //   const filterTable = items.filter((customerInfo : any) => (
      //     Object.keys(customerInfo).some(key => (
      //       String(customerInfo[key]).toLowerCase().includes(value.toLowerCase())
      //     ))
      //   ))

      //   setSearchFilter(filterTable);
      // }


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
                <Table 
                className="overflow-auto"                                       
                    columns={columns} 
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