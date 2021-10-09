

import React from 'react'

import { Select } from 'antd'

const Option=Select.Option;

export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        let Y=date.getFullYear();
        let M=date.getMonth()+1;
        let R=date.getDate();
        let H=date.getHours()>10?date.getHours():`0${date.getHours()}`
        let F=date.getMinutes()>10?date.getMinutes():`0${date.getMinutes()}`;
        let S=date.getSeconds()>10?date.getSeconds():`0${date.getSeconds()}`;

        return `${Y}-${M}-${R} ${H}:${F}:${S}`
    },

    pagenation(data,callback){
        let page={
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return  `共${data.result.total}条`
            },
            showQuickJumper:true
        }
        return page
    },

    getOptionList(data){
        if(!data){
            return []
        }
        let options=[]
         data.map(item=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },

    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedItem,
                selectedRowKeys,
                selectedIds
            })
        }else{
            this.setState({
                selectedItem,
                selectedRowKeys
            })
        }
        
    }
}