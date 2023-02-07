import imgUrl from '../../img/author.jpg'
import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import toDate from '../../utils/toDate';
function Product({i}) {
    const [productVal, setProductVal] = useState({
        id: '',
        name: '',
        cate: '',
        des: '',
        startTime: '',
        endTime: ''
    });

    const { state: { contract, accounts } } = useEth();    
    const getMessage = async () => {
            const value = await contract.methods.getProduct(i).call({ from: accounts[0] });
            console.log(value,value[0])
            setProductVal({id: value[0], name: value[1], cate: value[2], des: value[4], startTime: value[5], endTime: value[6] })
            console.log('new product object', productVal)
    }
    // useEffect(()=>{
    //     getMessage()
    // },[])
    // getMessage()
    return (
        <>
            <div>
                <img alt="img" src={imgUrl}></img>
                <div className="bottom">
                    <button onClick={getMessage}>test</button>
                    <div>产品编号：{productVal.id}</div>
                    <div>产品名称：{productVal.name}</div>
                    <div>产品种类：{productVal.cate}</div>
                    <div>产品介绍：{productVal.des}</div>
                    {/* 需优化：改为根据是否结束拍卖  显示拍卖倒计时或已结束 */}
                    <div>拍卖开始时间：{toDate(productVal.startTime)}</div>
                    <div>拍卖结束时间：{toDate(productVal.endTime)}</div>
                </div>
            </div>
        </>
    )
}

export default Product;