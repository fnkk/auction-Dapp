import imgUrl from '../../img/author.jpg'
import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import toDate from '../../utils/toDate';
import { Col, Row, Button, Input } from 'antd';
function Product({ i }) {
    const { state: { contract, accounts, web3 } } = useEth();
    const [bidValue, setBidValue] = useState(0);
    var eeevent = {}
    const [productVal, setProductVal] = useState({
        id: '',
        name: '',
        cate: '',
        des: '',
        startTime: '',
        endTime: ''
    });
    async function bid() {
        const amt_1 = web3.utils.toWei('1', 'ether');
        const sealedBid = web3.utils.sha3((bidValue * amt_1) + 'mysecretacc1');
        console.log('this is test', sealedBid)
        const res = await contract.methods.bid(i, sealedBid).send({ value: bidValue * amt_1, from: accounts[0] });
        console.log(res)
    }
    const bidChangeHandle = (e) => {
        console.log(e.target.value)
        setBidValue(e.target.value)
    }
    const getMessage = useCallback(async () => {
        const value = await contract.methods.getProduct(i).call({ from: accounts[0] });
        console.log('all messege', value)
        setProductVal({ id: value[0], name: value[1], cate: value[2], des: value[4], startTime: value[5], endTime: value[6] })
        // console.log('new product object', i)
    }, [accounts, i, contract.methods])
    const getEvent = useCallback(() => {
        eeevent = contract.events.NewProduct({
                filter: null,
                fromBlock: 0
            }, function (error, event) { console.log(1111, event) })
                .on("connected", function (subscriptionId) {
                    console.log(6666, subscriptionId)
                })
                .on("data", function (event) {
                    console.log(9999, event)
                })
                .on("error", function (error, receipt) {
                    console.log(7777)
                })
                console.log(web3.currentProvider,'this is event *******',eeevent)

        }
    )
    useEffect(() => {
        getMessage()
        getEvent()
    }, [getMessage])
    return (
        <>
            <div>
                <img alt="img" src={imgUrl}></img>
                <Row className="bottom">
                    <Col span={12} className='messge'>
                        <div>???????????????{productVal.id}</div>
                        <div>???????????????{productVal.name}</div>
                        <div>???????????????{productVal.cate}</div>
                        <div>???????????????{productVal.des}</div>
                        {/* ??????????????????????????????????????????  ????????????????????????????????? */}
                        <div>?????????????????????{toDate(productVal.startTime)}</div>
                        <div>?????????????????????{toDate(productVal.endTime)}</div>
                    </Col>
                    <Col span={12} className='bid'>
                        <Input addonAfter="ether" onChange={bidChangeHandle}></Input>
                        <Button onClick={bid}>??????</Button>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default Product;