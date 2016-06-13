import React, {PropTypes, Component} from 'react'
import Dropzone from 'react-dropzone'


const UPLOAD_STATUS = {
    UPLOADING: 1,
    COMPLETE: 2,
    ERROR: 3
}

class Attachment extends Component {
    render() {
        const {file} = this.props
        let operations = ''
        file.status = file.status || UPLOAD_STATUS.COMPLETE
        // file.status = UPLOAD_STATUS.UPLOADING

        switch (file.status) {
          case UPLOAD_STATUS.UPLOADING:
              let barStyle = {width: file.percent + '%'}

              operations = (
                <div className="inline">
                    <div className="attachment-bar">
                        <span className="attachment-progress" style={barStyle}></span>
                    </div>
                    <i className="remove icon" onClick={this.props.onAbort(file)}></i>
                </div>
              )
              break
          case UPLOAD_STATUS.ERROR:
              operations = (
                  <a onClick={this.props.onRetry(file)}>上传失败，点击重试</a>
              )
              break
          case UPLOAD_STATUS.COMPLETE: default:
              operations = (
                  <i className="remove icon" onClick={this.props.onDelete(file)} title="删除"></i>
              )
              break
        }

        return (
            <tr key={file.id}>
                <td className="attachment-title">
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
        let attachmentNodes = []

        for (let fileId in this.props.files) {
            let file = this.props.files[fileId]

            if (file) {
                attachmentNodes.push(
                    <Attachment file={file} key={fileId}
                                onDelete={this.props.onDelete}
                                onAbort={this.props.onAbort}
                                onRetry={this.props.onRetry} />)
            }
        }

        return(
            <div className="ui grid">
                <div className="two wide column"></div>
                <div className="seven wide column">
                    <table className="ui very basic table">
                      <tbody>
                        {attachmentNodes}
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

        let files = this.props.files
        let fileDicts = {}

        this.props.files.map((file) => {
            fileDicts[file.id] = file
        })

        this.state = fileDicts
    }

    mergeState(entry, dirtyId) {
        return Object.assign({}, this.state, {
            [dirtyId]: entry
        })
    }

    setUploadingState(status, dirtyId, percent) {
        let entry = {status: status}
        if (percent) entry.percent = percent
        entry = Object.assign({}, this.state[dirtyId], entry)
        this.setState(this.mergeState(entry, dirtyId))

        return entry
    }

    uploadProgress(event, dirtyId) {
        let percent = parseInt(100 * event.loaded / event.total, 10)
        this.setUploadingState(UPLOAD_STATUS.UPLOADING, dirtyId, percent)
    }

    uploadError(event, dirtyId) {
        this.setUploadingState(UPLOAD_STATUS.ERROR, dirtyId)
    }

    accomplish(event, xhr, dirtyId) {
        if (xhr.status !== 200) {
            this.uploadError(event, dirtyId)
            return
        }

        let response = JSON.parse(xhr.responseText)

        if (!response) {
            this.uploadError(event, dirtyId)
            return
        }

        if (response.status === 0) {
            let entry = this.setUploadingState(UPLOAD_STATUS.COMPLETE, dirtyId)
            entry.id = response.attachment_id
            delete this.state[dirtyId]
            this.setState(this.mergeState(entry, entry.id))
        } else {
            this.uploadError(event, dirtyId)
        }
    }

    upload(file, dirtyId) {
        let formData = new FormData()

        formData.append('file', file)
        formData.append('type', 0) //所有与任务相关联的附件type为0
        formData.append('task_id', this.props.taskId)

        let xhr = new XMLHttpRequest()
        let uploadHandler = xhr.upload || xhr

        uploadHandler.addEventListener('progress', (event) => this.uploadProgress(event, dirtyId))
        // uploadHandler.addEventListener('abort', (event) => this.uploadAbort(event, dirtyId))
        uploadHandler.addEventListener('error', (event) => this.uploadError(event, dirtyId))
        xhr.addEventListener('load', (event) => this.accomplish(event, xhr, dirtyId))

        xhr.open('POST', '/api/v1/attachments')
        xhr.send(formData)

        return xhr
    }

    removeFileFromState(file) {
        let fileDicts = Object.assign({}, this.state)
        fileDicts[file.id] = null
        this.setState(fileDicts)
    }

    onDelete(file) {
        return () => {
            $.ajax({
                url: '/api/v1/attachments/' + file.id,
                dataType: 'JSON',
                type: 'DELETE'
            }).then((response) => {
                if (response.status === 0) {
                    this.removeFileFromState(file)
                } else {
                    //TODO
                }
            });
        }
    }

    abortUpload(file) {
        return () => {
            let fileEntry = this.state[file.id]
            if (!fileEntry) {
                console.log('File not in current state')
                return
            }

            fileEntry.xhr.abort()
            this.removeFileFromState(file)
        }
    }

    onRetry(file) {
        return () => {
            let fileEntry = this.state[file.id]

            if (!fileEntry) {
                console.log('File not in current state')
                return
            }

            let originFile = fileEntry.originFile
            this.upload(originFile, file.id)
        }
    }

    onDrop(files) {
        let fileDicts = this.state;

        for (let i = 0, l = files.length; i < l; i ++) {
            // dirty id for file
            let dirtyId = 'dirty_' + parseInt(Math.random() * 1000, 10)
            let originFile = files[i]
            let xhr = this.upload(originFile, dirtyId)

            fileDicts[dirtyId] = {
                id: dirtyId,
                name: originFile.name,
                size: originFile.size,
                originFile: originFile,
                xhr: xhr,
                status: UPLOAD_STATUS.UPLOADING
            }
        }

        this.setState(fileDicts)
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
                    <div className="two wide column attachment-title">
                        <label>任务附件</label>
                    </div>
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
                <AttachmentList files={this.state}
                                onDelete={::this.onDelete}
                                onAbort={::this.abortUpload}
                                onRetry={::this.onRetry} />
            </div>
        )
    }
}
