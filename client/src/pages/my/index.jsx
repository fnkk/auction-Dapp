import { useNavigate } from "react-router-dom";
import { Button, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState, useCallback } from "react";
import NftItem from "./nftItem";
function My() {
    const navigate = useNavigate()
    const [tokenIdList, setTokenIdList] = useState([]);
    const goToAddNft = () => {
        navigate('/addNft', {
            replace: false
        })
    }
    const { state: { contract, accounts, web3 } } = useEth();
    const getList = useCallback(async () => {
        if (contract) {
            const res = await contract.methods.getKeepToken(accounts[0]).call({ from: accounts[0] })
            // console.log('获取的结果数组', res)
            setTokenIdList(res)
        }
    }, [accounts,contract])
    useEffect(() => {
        getList()
    }, [getList])

    return (
        <>
            <div className="my">
                <h2 style={{ margin: '25px 0' }}>我的数字藏品</h2>
                <Button type="primary" onClick={() => { goToAddNft() }} style={{ margin: '25px 0' }}><PlusOutlined />创建NFT</Button>
                <Row gutter={16}>
                    {tokenIdList.map((item) => {
                        if (item !== 0) {
                            return (<NftItem key={item} i={item}>
                            </NftItem>)
                        }else{
                            return null;
                        }

                    })}

                </Row>
            </div>

        </>
    )
}
export default My;