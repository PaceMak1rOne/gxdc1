import React, { Component } from 'react';
import { Card,Button,Modal} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html';
export default class Rich extends Component {
    state={
        showRichTex:false,
        editorState:""
    }
    onEditorStateChange = (editorState) =>{
              this.setState({ editorState });
    }
    handleClearContent = () =>{
        this.setState({ editorState:""  });
    }
    handleGetText = () =>{
        this.setState({ 
        showRichText : true
          });
    }
    onEditorChange = (contentState) =>{
        this.setState({ contentState  });
    }
    render() {
        const {editorState} = this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft:10}}>获取HTML文本</Button>
                    </Card>
                <Card title="富文本编辑器">
                <Editor
                editorState={editorState}
                onContentStateChange={this.onEditorChange}
                onEditorStateChange={this.onEditorStateChange}
                />
                </Card>
                <Modal 
                title="富文本"
                visible={this.state.showRichText}
                onOk={()=>{
                    this.setState({ 
                        showRichText : false
                          });
                }}
                onCancel={()=>{
                    this.setState({ 
                    showRichText : false
                      });
                }}
                >
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
