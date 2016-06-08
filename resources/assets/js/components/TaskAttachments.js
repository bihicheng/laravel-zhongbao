import React, {PropTypes, Component} from 'react'
import Dropzone from 'react-dropzone'

class AttachmentList extends Component {
    render() {
        return(
            <div></div>
        )
    }
}


export default class TaskAttachments extends Component {
    constructor(props) {
        super(props)
        this.state = {files: this.props.files}
    }

    onDrop(files) {
        console.log(files);
    }

    componentDidMount() {
        let uploadBtn = this.refs.uploadBtn

        $(uploadBtn).popup({
            position: 'right center'
        })
    }

    render() {
        return (
            <div className="ui basic segment">
                <Dropzone ref="dropzone" onDrop={this.onDrop} className="secondary">
                    <button className="ui labeled icon orange button" ref="uploadBtn">
                        <i className="plus icon"></i>
                        上传附件
                    </button>
                    <div className="ui flowing right left popup info">
                        <div className="ui list">
                            <div className="item">
                                <i className="caret right icon "></i>
                                附件为项目的说明文档，以及必需的素材等，每个附件等大小不能超过10M，过大的素材请与您项目的认证设计师通过QQ或邮件传送。
                            </div>
                            <div className="item">
                                <i className="caret right icon "></i>
                                附件请尽量以用途为命名方式，如“说明文档.docx”、“封面图.psd”。
                            </div>
                            <div className="item red">
                                <i className="warning circle red icon "></i>
                                上传的素材将在项目完成之后自动从服务器中删除，请您妥善保存。
                            </div>
                        </div>
                    </div>
                    <AttachmentList files={this.props.files} />
                </Dropzone>
            </div>
        ) 
    }
}
