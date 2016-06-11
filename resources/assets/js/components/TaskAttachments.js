import React, {PropTypes, Component} from 'react'
import Dropzone from 'react-dropzone'


const UPLOAD_STATUS = {
    UPLOADING: 1,
    COMPELETE: 2,
    ERROR: 3
}

class Attachment extends Component {
    render() {
        const {file} = this.props
        let operations = ''

        switch (file.uploading) {
          case '':
              operations = (
                <div className="ui small orange progress">
                    <div className="bar">
                        <div className="progress" date-percent={file.percent}></div>
                        <i className="delete icon" onClick={this.props.onAbort(file)}>取消</i>
                    </div>
                </div>
              )
              break
          case 2:
              operations = (
                  <i className="delete icon" onClick={this.props.onRetry(file)}>重试</i>
              )
              break
          case 3:
              operations = (
                  <i className="delete icon" onClick={this.props.onAbort(file)}></i>
              )
              break
          case 4: default:
              operations = (
                  <i className="delete icon" onClick={this.props.onDelete(file)}></i>
              )
              break
        }

        return (
            <tr key={file.id}>
                <td>
                    <i className="file icon"></i>
                    <a>{file.name}</a>
                </td>
                <td>
                    {operations}
                </td>
            </tr>
        )
    }
}

class AttachmentList extends Component {
    render() {
        return(
            <div className="ui grid">
                <div className="five wide column">
                    <table className="ui very basic table">
                      <tbody>
                        {
                          this.props.files.map((file, index) => {
                            return (
                                <Attachment file={file} key={index}
                                            onDelete={this.props.onDelete}
                                            onAbort={this.props.onAbort}
                                            onRetry={this.props.onRetry} />
                            )
                          })
                        }
                      </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default class TaskAttachments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: this.props.files
        }
    }

    mergeState(entry, index) {
        return [
          ...this.state.files.slice(0, index),
          entry,
          ...this.state.files.slice(index + 1)
        ]
    }

    setUploadingState(status, index, percent) {
        let entry = {status: status}
        if (percent) entry.percent = percent
        entry = Object.assign({}, this.state[index], entry)
        this.setState(this.mergeState(entry, index))
    }

    uploadProgress(event, index) {
        let percent = parseInt(100 * event.loaded / event.total, 10)
        this.setUploadingState(UPLOAD_STATUS.UPLOADING, index, percent)
    }

    uploadError(event, index) {
        this.setUploadingState(UPLOAD_STATUS.ERROR, index)
    }

    accomplish(event, index) {
        this.setUploadingState(UPLOAD_STATUS.COMPELETE, index)
    }

    upload(file, index) {
        let formData = new FormData()

        formData.append('file', file)
        formData.append('type', 0) //所有与任务相关联的附件type为0
        formData.append('task_id', this.props.taskId)

        let xhr = new XMLHttpRequest()
        let uploadHandler = xhr.upload || xhr

        uploadHandler.addEventListener('progress', (event) => this.uploadProgress(event, index))
        uploadHandler.addEventListener('abort', (event) => this.uploadAbort(event, index))
        uploadHandler.addEventListener('error', (event) => this.uploadError(event, index))
        xhr.addEventListener('load', (event) => this.accomplish(event, index))

        xhr.open('POST', '/api/v1/attachments')
        xhr.send(formData)
    }

    onDelete(file) {
        $.ajax({
            url: '/api/v1/attachments/' + id,
            dataType: 'JSON',
            type: 'DELETE'
        }).then((response) => {
            if (response.status === 0) {

            } else {

            }
        });
    }

    abortUpload() {

    }

    onRetry() {

    }

    onDrop(files) {
        let originFiles = this.state.files;

        for (let i = 0, l = files.length; i < l; i ++) {
            let fileId = parseInt(Math.random() * 1000, 10) // create random key for component list render
            let file = files[i]
            originFiles.push({
                id: fileId,
                name: file.name,
                size: file.size,
                uploading: 0
            })

            console.log(fileId);
            //this.upload(files[0], fileId)
        }

        this.setState(originFiles)
    }

    componentDidMount() {
        let uploadTip = this.refs.uploadTip

        $(uploadTip).popup({
            inline: true,
            width: 500,
            position: 'right center'
        })
    }

    render() {
        return (
            <div className="ui basic">
                <div className="ui grid">
                    <div className="ten wide column">
                        <Dropzone ref="dropzone" onDrop={this.onDrop.bind(this)} className="ui labeled icon orange button">
                            <i className="plus icon"></i>
                            上传附件
                        </Dropzone>
                        <i className="info circle large grey icon" ref="uploadTip"></i>
                        <div className="ui flowing right left popup info">
                            <div className="ui list">
                                <div className="item">
                                    <i className="caret right icon"></i>
                                    附件为项目的说明文档，以及必需的素材等，每个附件等大小不能超过10M，过大的素材请与您项目的认证设计师通过QQ或邮件传送。
                                </div>
                                <div className="item">
                                    <i className="caret right icon"></i>
                                    附件请尽量以用途为命名方式，如“说明文档.docx”、“封面图.psd”。
                                </div>
                                <div className="item red">
                                    <i className="warning circle red icon"></i>
                                    上传的素材将在项目完成之后自动从服务器中删除，请您妥善保存。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AttachmentList files={this.props.files}
                                onDelete={this.onDelete}
                                onAbort={this.abortUpload}
                                onRetry={this.onRetry} />
            </div>
        )
    }
}
