import { Button, Card, Input } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import useEth from "../../contexts/EthContext/useEth";
import toDate from '../../utils/toDate'

function Transfer() {
    const { state: { contract, accounts, web3 } } = useEth();
    const state = useLocation();
    const [nftVal, setNftVal] = useState(state.state.nft);
    const [to, setTo] = useState('');
    // console.log(nftVal)
    const changeTo = (e) => {
        setTo(e.target.value)
    }
    const transfer = () => {

    }
    return (
        <>
            <div className="my">
                <h2 style={{ margin: '25px 0' }}>数字藏品转赠</h2>
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
                        <div className={"item"}><span className='title'>被赠送的用户地址：</span>
                            <Input className={"input"} value={to} onChange={(e) => { changeTo(e) }} placeholder="请输入被赠送的用户地址"></Input></div>
                        <div className='item'><Button type='primary' onClick={() => { transfer() }}>转赠</Button></div>
                    </Card>
                </div>

            </div>
        </>
    )
}
export default Transfer;