import { Button, Card, Input, Spin } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import useEth from "../../contexts/EthContext/useEth";
import toDate from '../../utils/toDate'

function AddSwap() {
    const { state: { contract, accounts, web3 } } = useEth();
    const state = useLocation();
    const [nftVal, setNftVal] = useState(state.state.nft);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('');
    const changeTo = (e) => {
        setTo(e.target.value)
    }
    const putList = async () => {
        setLoading(true)
        const res = await contract.methods.list(address, nftVal.tokenId, price).send({ from: accounts[0] });
        console.log(res)
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
    }
    return (
        <>
            <div className="my">
                <Spin spinning={loading} delay={500} tip="创建中...">
                    <h2 style={{ margin: '25px 0' }}>数字藏品挂单</h2>
                    <div className='box'>
                        <Card
                            hoverable
                            style={{
                                width: 720,
                            }}
                            cover={<img width={"200px"} alt="tupian" src={nftVal.pic ? `http://localhost:8080/ipfs/${nftVal.pic}` : ''} />}
                        >
                            <div className={"item"}><span className='title'>名称：</span>{nftVal.name}</div>
                            <div className={"item"}><span className='title'>作者：</span>{nftVal.author}</div>
                            <div className={"item"}><span className='title'>创建时间：</span>{toDate(nftVal.createdTime)}</div>
                            <div className={"item"}><span className='title'>价格：</span>
                                <Input className={"input"} value={price} onChange={(e) => { changeTo(e) }} placeholder="请输入价格"></Input></div>
                            <div className='item'><Button type='primary' onClick={() => { putList() }}>提交</Button></div>
                        </Card>
                    </div>
                </Spin>
            </div>
        </>
    )
}
export default AddSwap;