import React, { Component } from 'react'

import { Card , Button , Tabs , message , Icon } from 'antd'

import './ui.less'

const TabPane = Tabs.TabPane

export default class Tab extends Component {
    state={
    }
    newTabIndex = 0;
    callback=(key)=>{
        message.info("Hi，您选择了页签："+key)
    }
    onChange=(activeKey)=>{
        this.setState({activeKey})
    }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab'+this.newTabIndex, content: 'Content of new Tab'+this.newTabIndex, key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
    
    componentWillMount(){
        const panes=[
            {
                title:"Tab 1",
                content:"Tab 1",
                key:"1"
            },
            {
                title:"Tab 2",
                content:"Tab 2",
                key:"2"
            },
            {
                title:"Tab 3",
                content:"Tab 3",
                key:"3"
            }
        ]
        this.setState({panes,activeKey:panes[0].key})
    }

    render() {
        return (
            <div>
                <Card title='Tab标签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab='Tab 1' key='1'>Tab 1</TabPane>
                        <TabPane tab='Tab 2' key='2' disabled>Tab 2</TabPane>
                        <TabPane tab='Tab 3' key='3'>Tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab带图的页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.callback}>
                        <TabPane key='1' tab={<span><Icon type='plus' />Tab 1</span>}>Tab 1</TabPane>
                        <TabPane key='2' tab={<span><Icon type='edit' />Tab 2</span>}>Tab 2</TabPane>
                        <TabPane key='3' tab={<span><Icon type='delete' />Tab 3</span>}>Tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title='自动添加' className='card-wrap'>
                    <Tabs 
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type='editable-card'
                    onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(panel=> <TabPane tab={panel.title} key={panel.key} >{panel.content}</TabPane>)
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
