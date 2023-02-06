import imgUrl from '../../img/author.jpg'
function Product() {

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