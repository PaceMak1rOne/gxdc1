import React, { Component } from 'react'

import utiles from '../../utiles/utiles';
import { Table } from 'antd'



export default class ETable extends Component {
    onRowClick=(record,index)=>{
        let rowSelection=this.props.rowSelection;
        if(rowSelection=='checkbox'){
            let selectedRowKeys=this.props.selectedRowKeys;
            let selectedItem=this.props.selectedItem || [];
            let selectedIds = this.props.selectedIds;
            if(selectedIds){
                const i = selectedIds.indexOf(record.id);
                if(i===-1){
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);

                }
            }else{
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || {},selectedIds);
        }else{
            let selectKey = [index];
            const selectedRowKeys = this.props.selectedRowKeys;
            if (selectedRowKeys && selectedRowKeys[0] == index){
                return;
            }
            this.props.updateSelectedItem(selectKey,record || {});
        }
        
    }
    tableInit = ()=>{
        let row_selection = this.props.rowSelection;
        let selectedRowKeys=this.props.selectedRowKeys
        const rowSelection={
            type:"radio",
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        // debugger
        if(row_selection===false || row_selection===null){
            row_selection=false;
        }else if(row_selection=='checkbox'){
            rowSelection.type='checkbox'
        }else{
            row_selection = 'radio'
        }
        return <Table 
        {...this.props}
        rowSelection={row_selection?rowSelection:null}
        pagination={false}
        onRow={(record,index) => {
            return {
              onClick: event => {
                  if(!row_selection){
                      return ;
                  }
                  this.onRowClick(record,index)
              }, // ?????????
              onMouseEnter: event => {}, // ???????????????
            };
        }}
         />
    }
        // ???????????????
        onSelectChange = (selectedRowKeys, selectedRows) => {
            let rowSelection = this.props.rowSelection;
            const selectedIds = [];
            if(rowSelection == 'checkbox'){
                selectedRows.map((item)=>{
                    selectedIds.push(item.id);
                });
                this.setState({
                    selectedRowKeys,
                    selectedIds:selectedIds,
                    selectedItem: selectedRows[0]
                });
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedRows[0],selectedIds);
        };
        getOptions = () => {
            let p = this.props;
            const name_list = {
                "????????????":170,
                "????????????":80,
                "????????????":96,
                "????????????":70,
                "??????":70,
                "????????????":300,
                "??????":42,
                "????????????":76,
                "???????????????":97,
                "??????ID":64
            };
            if (p.columns && p.columns.length > 0) {
                p.columns.forEach((item)=> {
                    //??????/?????? ??????
                    if(!item.title){
                        return
                    }
                    if(!item.width){
                        if(item.title.indexOf("??????") > -1 && item.title.indexOf("????????????") < 0){
                            item.width = 132
                        }else if(item.title.indexOf("??????") > -1){
                            item.width = 86
                        }else if(item.title.indexOf("??????") > -1 || item.title.indexOf("????????????") > -1){
                            item.width = '40%';
                            item.className = "text-left";
                        }else{
                            if(name_list[item.title]){
                                item.width = name_list[item.title];
                            }
                        }
                    }
                    item.bordered = true;
                });
            }
            const { selectedRowKeys } = this.props;
            const rowSelection = {
                type: 'radio',
                selectedRowKeys,
                onChange: this.onSelectChange,
                onSelect:(record, selected, selectedRows)=>{
                    console.log('...')
                },
                onSelectAll:this.onSelectAll
            };
            let row_selection = this.props.rowSelection;
            // ????????????false??????null???????????????????????????????????????
            if(row_selection===false || row_selection === null){
                row_selection = false;
            }else if(row_selection == 'checkbox'){
                //????????????????????????
                rowSelection.type = 'checkbox';
            }else{
                //???????????????
                row_selection = 'radio';
            }
            return <Table 
                    className="card-wrap page-table"
                    bordered 
                    {...this.props}
                    rowSelection={row_selection?rowSelection:null}
                    onRow={(record,index) => ({
                        onClick: ()=>{
                            if(!row_selection){
                                return;
                            }
                            this.onRowClick(record,index)
                        }
                      })}
                />
        };
        onSelectAll = (selected, selectedRows, changeRows) => {
            let selectedIds = [];
            let selectKey = [];
            selectedRows.forEach((item,i)=> {
                selectedIds.push(item.id);
                selectKey.push(i);
            });
            this.props.updateSelectedItem(selectKey,selectedRows[0] || {},selectedIds);
        }
    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }

}