import { useNavigate } from "react-router-dom";
import { Button, message, Col, Row, Card } from 'antd';
import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState, useCallback } from "react";
const { Meta } = Card;
function NftItem({ i }) {
    const { state: { contract, accounts, web3 } } = useEth();
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
    const gotoTransfer = () => {
        navigate('../transfer', {
            replace: false,
            state: { nft: nftVal }
        })
    }
    const gotoAddSwap = () => {
        navigate('../addSwap',{
            replace:false,
            state: { nft: nftVal }
        })
    }
    const getMessage = useCallback(async () => {
        const value = await contract.methods.getTokenDetail(i).call({ from: accounts[0] });
        // console.log('all messege', value)
        setNftVal({
            tokenId: value[0], pic: value[1], name: value[2], des: value[3],
            owner: value[4], createdTime: value[5], author: value[6], transferSum: value[7]
        })
    }, [accounts, i, contract.methods])
    useEffect(() => {
        getMessage()
    }, [getMessage])
    return (
        <>
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
                    <Meta title="简介" className="名称" description={nftVal.des} />
                    <div className={"item"}>
                        <Button type='primary' style={{ marginRight: '25px' }} onClick={() => { gotoTransfer() }}>转赠</Button>
                        <Button type='primary' onClick={() => { gotoAddSwap() }}>拍卖</Button>
                    </div>
                </Card>
            </Col>
        </>
    )
}
export default NftItem;