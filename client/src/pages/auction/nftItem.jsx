import { useNavigate } from "react-router-dom";
import { Button, message, Col, Row, Card, Spin, Modal, InputNumber } from 'antd';
import useEth from "../../contexts/EthContext/useEth";
import useSwap from "../../contexts/SwapContext/useSwap"
import { useEffect, useState, useCallback } from "react";
const { Meta } = Card;
function NftItem({ i,getActivedSwapList }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [tips, setTips] = useState('')
    const [newPrice, setNewPrice] = useState(0)
    const { state: { contract, accounts, address } } = useEth();
    const { state: { contract: swapContract } } = useSwap();
    const [nftVal, setNftVal] = useState({
        tokenId: '',
        name: '',
        des: '',
        pic: '',
        owner: '',
        createdTime: '',
        author: '',
        transferSum: ''
    });
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onChange = (value) => {
        // console.log('changed', value)
        setNewPrice(value)
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        updatePrice()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const purchase = async () => {
        setLoading(true)
        setTips('购买中...')
        try {
            const res = await swapContract.methods.purchase(address, i.tokenId).send({ from: accounts[0], value: 50 })
            if (res.blockHash) {
                messageApi.open({
                    type: 'success',
                    content: '购买成功！',
                });
            getActivedSwapList()
            }
        } catch {
            messageApi.open({
                type: 'error',
                content: '购买失败！',
            });
        } finally {
            setLoading(false)
        }

    }
    const updatePrice = async () => {
        setLoading(true)
        setTips('修改价格中...')
        try {
            await swapContract.methods.update(address, i.tokenId, newPrice).send({ from: accounts[0] })
            messageApi.open({
                type: 'success',
                content: '修改价格成功！',
            });
            getActivedSwapList()
            console.log('刷新页面')
        } catch {
            messageApi.open({
                type: 'error',
                content: '修改价格失败！',
            });
        } finally {
            setLoading(false)
        }
    }
    const revoke = async () => {
        setLoading(true)
        setTips('撤单中...')
        try {
            await swapContract.methods.revoke(address, i.tokenId).send({ from: accounts[0] })
            messageApi.open({
                type: 'success',
                content: '撤单成功！',
            });
            getActivedSwapList()
        } catch {
            messageApi.open({
                type: 'error',
                content: '撤单失败！',
            });
        } finally {
            setLoading(false)
        }


    }
    const getMessage = useCallback(async () => {
        const value = await contract.methods.getTokenDetail(i.tokenId).call({ from: accounts[0] });
        // console.log('all messege', value)
        setNftVal({
            tokenId: value[0], pic: value[1], name: value[2], des: value[3],
            owner: value[4], createdTime: value[5], author: value[6], transferSum: value[7]
        })
    }, [accounts, i, contract])
    useEffect(() => {
        console.log('address:',address)
        getMessage()
    }, [getMessage])
    return (
        <>
            <Spin spinning={loading} delay={500} tip={tips}>
                <Col className="nft-item" span={8}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img width={"200px"} alt="tupian" src={nftVal.pic ? `http://localhost:8080/ipfs/${nftVal['pic']}` : ''} />}
                    >
                        <div className={"item"}><span className='title'>tokenId：</span>{nftVal.tokenId}</div>
                        <div className={"item"}><span className='title'>名称：</span>{nftVal.name}</div>
                        <div className={"item"}><span className='title'>卖家：</span>{i.seller}</div>
                        {i.buyer ? <div className={"item"}><span className='title'>买家：</span>{i.buyer}</div> : ''}
                        <div className={"item"}><span className='title'>价格：</span>{i.price}</div>
                        <Meta title="简介" className="名称" description={nftVal.des} />
                        <div className={"item"}><span className='title'>状态：</span>{i.state === 0 ? '进行中' : i.state === 1 ? '已完成' : i.state === 2 ? '已撤单' : ''}</div>
                        <div className={"item"}>
                            {i.state === 0 && accounts[0] !== i.seller ? <Button type='primary' style={{ marginRight: '25px' }} onClick={() => { purchase() }}>购买</Button> : ''}
                        </div>
                        {i.state === 0 && accounts[0] === i.seller ? <div className="item">
                            <Button type='primary' onClick={() => { showModal() }} style={{ marginRight: '25px' }}>修改价格</Button>
                            <Button type='primary' onClick={() => { revoke() }}>撤单</Button>
                        </div> : ''}

                    </Card>
                </Col>
            </Spin>
            <Modal title="修改价格" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                新的价格：<InputNumber defaultValue={i.price} onChange={onChange} addonAfter="wei"></InputNumber >
            </Modal>
        </>
    )
}
export default NftItem;