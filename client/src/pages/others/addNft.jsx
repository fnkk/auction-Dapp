import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import IpfsApi from "ipfs-api";// 导入ipfs
var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })// 创建ipfs实例（要启动ipfs daemon服务）
const { Dragger } = Upload;
const { TextArea } = Input;

function AddNft() {
    useEffect(() => {
        document.title = '创建nft'
    }, [])
    const fileid = useRef(null);
    const [picHash, setPicHash] = useState('');
    const props = {
        name: 'file',
        multiple: false,
        beforeUpload: () => {
            return false;
          },
        onChange({file}) {
            upload(file)    
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        listType:picture,
        showUploadList: false
    };
    const upload = async (info) => {
        let reader = new FileReader()
        reader.readAsArrayBuffer(info)

        reader.onloadend = () => {
            console.log("result : ", reader.result)
            saveToIpfs(reader.result).then(hash => {
                console.log("hash : ", hash)
                setPicHash(hash)
            })
        }
    }

    const saveToIpfs = (data) => {
        const buffer = Buffer.from(data)
        return new Promise(async (resolve, reject) => {
            try {
                let res = await ipfs.add(buffer)
                let hash = res[0].hash
                console.log('hash is:', hash)
                resolve(hash)
            } catch (e) {
                console.log('出错了！！！')
                reject(e)
            }
        })
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container">
            <div style={{ margin: '25px 0' }}>
                <h2>
                    创建新项目
                </h2>
                <span>支持的格式：JPG,PNG,SVG,GIF。最大不超过20MB</span>
            </div>
            <div style={{ height: '200px', margin: '25px 0' }}>
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">上传图片</p>
                </Dragger>
            </div>

            <Form
                name="basic"
                labelAlign="left"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="名称"
                    name="nftName"
                    rules={[
                        {
                            required: true,
                            message: '请输入nft名称!',
                        },
                    ]}
                >
                    <Input placeholder="请输入nft名称" />
                </Form.Item>

                <Form.Item
                    label="简介"
                    name="description"
                >
                    <TextArea placeholder="请输入简介"/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <h2>请上传图片：</h2>
            <div>
                <input type='file' ref={fileid} />
            </div>
            <button onClick={() => {
                console.log(fileid.current.files[0])
                // upload(fileid.current.files[0])
            }}>点击我上传到ipfs</button>
            <div>
                {
                    picHash && <h3>图片已经上传到IPFS：{picHash}</h3>
                }
                {
                    picHash && <img src={"http://localhost:8080/ipfs/" + picHash} />
                }
            </div>
        </div>
    )
}
export default AddNft;