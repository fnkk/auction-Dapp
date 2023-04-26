import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, Upload, Modal, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from '@ant-design/icons';
import useEth from "../../contexts/EthContext/useEth";
import IpfsApi from "ipfs-api";// 导入ipfs
var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })// 创建ipfs实例（要启动ipfs daemon服务）
const { TextArea } = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function AddNft() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        document.title = '创建nft'
    }, [])
    // const fileid = useRef(null);
    const { state: { contract, accounts, web3 } } = useEth();
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [picHash, setPicHash] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleCancel = () => setPreviewOpen(false);
    const props = {
        name: 'file',
        multiple: false,
        beforeUpload: () => {
            return false;
        },
        onChange({ file, fileList: newFileList }) {
            setFileList(newFileList)
            upload(file)
        },
        onPreview: handlePreview,
        listType: 'picture-card',
        fileList: fileList,
        maxCount: 1,
        // showUploadList: false
    };

    const upload = async (info) => {
        let reader = new FileReader()
        console.log(info)
        delete info.uid
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
                alert('出错了！！')
                reject(e)
            }
        })
    }

    const onFinish = async ({ nftName, description }) => {
        var createdTime = Date.now()
        setLoading(true)
        const res = await contract.methods._mint(accounts[0], picHash, nftName, description, createdTime).send({ from: accounts[0] });
        console.log(res, '_mint的回调')
        setLoading(false)
        if (res.blockHash) {
            messageApi.open({
                type: 'success',
                content: '创建成功！',
            });
            navigate('/my', {
                replace: false
            })
        } else {
            messageApi.open({
                type: 'error',
                content: '创建失败！',
            });
        }
    };
    const test = () => {
        const res = contract.methods.getTokenDetail(0).call({ from: accounts[0] })
        res.then(r => {
            console.log(r)
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container">
            <Spin spinning={loading} delay={500} tip="创建中...">
                <div style={{ margin: '25px 0' }}>
                    <h2>
                        创建新项目
                    </h2>
                    <span>支持的格式：JPG,PNG,SVG,GIF。最大不超过20MB</span>
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
                        label=""
                        name="picture"
                        // 以下两条是必须的
                        valuePropName="fileList"
                        // 如果没有下面这一句会报错
                        getValueFromEvent={e => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                        rules={[
                            {
                                required: true,
                                message: '请上传图片!',
                            },
                        ]}
                    >
                        <Upload {...props} >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">上传图片</p>
                        </Upload>
                    </Form.Item>
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
                        <TextArea placeholder="请输入简介" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                       
                    </Form.Item>
                </Form>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
                {/* <h2>请上传图片：</h2>
            <div>
                <input type='file' ref={fileid} />
            </div>
            <button onClick={() => {
                console.log(fileid.current.files[0])
                upload(fileid.current.files[0])
            }}>点击我上传到ipfs</button>
            <div>
                {
                    picHash && <h3>图片已经上传到IPFS：{picHash}</h3>
                }
                {
                    // picHash && <img src={"http://localhost:8080/ipfs/" + picHash} />
                }
            </div> */}
            </Spin>
        </div>
    )
}
export default AddNft;