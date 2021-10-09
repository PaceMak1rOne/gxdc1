import axios from 'axios'
import { Modal } from 'antd'

import Utils from '../utiles/utiles'
export default class Axios {
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false ){

            loading = document.getElementById("ajaxLoading");
            loading.style.display='block';
        }
        const baseUrl='https://www.fastmock.site/mock/e3ebf01b7a9d7bcff2a23508be84c6a0/dan_che_api'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseUrl,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            })
            .then(res=>{
                if(options.data && options.data.isShowLoading !== false ){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display='none'
                }

                if(res.status===200){
                    if(res.data.code=='0'){
                        resolve(res.data);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.data.msg
                        })
                    }
                }else{
                    reject(response.data)
                    
                }
            })
        });
    }
    static requestList(_this,url,params,isMock){
        var data={
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then(data=>{
            if(data && data.result){
                let list =data.result.list.map((item,index)=>{
                    item.key=index;
                    return item
                })
                _this.setState({
                    list,
                    pagination:Utils.pagenation(data,(current)=>{
                        _this.params.page=current,
                        _this.requestList()
                    })
                })
            }
        })
    }
}