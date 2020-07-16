import React from 'react';
import {Pagination}  from 'antd';

interface Props {
    total : number,
    current : number,
    onChange : any,
    pageSize : number
}

export const MyPagination : React.SFC<Props> = ({total, current, onChange, pageSize}) => {

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

    return(
        <div className="mt-2 flex justify-center">
        <MyPagination 
            total={total}
            current={current}
            onChange={onChange}
        />
        </div>
    );
}