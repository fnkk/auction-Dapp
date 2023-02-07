import imgUrl from '../../img/author.jpg'
import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
function Product() {
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
            const value = await contract.methods.getProduct(1).call({ from: accounts[0] });
            setProductVal({ id: value[0], name: value[1], cate: value[2], des: value[4], startTime: value[5], endTime: value[6] })
            console.log('renewed product object', productVal)
    }

    // getMessage()  
    return (
        <>
            <div>
                <img alt="img" src={imgUrl}></img>
                <div className="bottom">
                    <div>产品编号：</div>
                    <div>产品名称：</div>
                    <div>产品种类：</div>
                    <div>产品介绍：</div>
                    {/* 需优化：改为根据是否结束拍卖  显示拍卖倒计时或已结束 */}
                    <div>拍卖开始时间：</div>
                    <div>拍卖结束时间：</div>
                </div>
            </div>
        </>
    )
}

export default Product;