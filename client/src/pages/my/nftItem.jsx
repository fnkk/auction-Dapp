import { Button, message, Col, Row, Card } from 'antd';
import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState,useCallback } from "react";
const { Meta } = Card;
function NftItem({ i }) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [nftVal, setNftVal] = useState({
        name: '',
        des: '',
        pic: ''
    });
    const getMessage = useCallback(async () => {
        const value = await contract.methods.getTokenDetail(i).call({ from: accounts[0] });
        console.log('all messege', value)
        setNftVal({ pic: value[0], name: value[1], des: value[2] })
    }, [accounts, i, contract.methods])
    useEffect(() => {
        getMessage()
    },[getMessage])
    return (
        <>
            <Col className="nft-item" span={8}>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img width={"200px"} alt="tupian" src={nftVal.pic?`http://localhost:8080/ipfs/${nftVal['pic']}`:''} />}
                >
                    <div className={"item"}><span className='title'>名称：</span>{nftVal.name}</div>
                    <Meta title="简介" className="名称" description={nftVal.des} />
                </Card>
            </Col>
        </>
    )
}
export default NftItem;