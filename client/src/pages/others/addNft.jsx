import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, Upload, Modal } from 'antd';
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
    useEffect(() => {
        document.title = '创建nft'
    }, [])
    // const fileid = useRef(null);
    const { state: { contract, accounts, web3 } } = useEth();
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

    const onFinish = async({nftName,description}) => {
        const res = await contract.methods._mint(accounts[0],picHash,nftName,description).send({ from: accounts[0] });
        console.log(res,'请求合约函数的回调')
    };
    const test = ()=>{
        const res = contract.methods.getTokenDetail(0).call({ from: accounts[0] })
        res.then(r=>{
            console.log(r)
        })
    }
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
                    <Button type="primary" onClick={()=>{test()}}>
                        test
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
        </div>
    )
}
export default AddNft;