import { Link, useNavigate } from "react-router-dom";
function Header(){
    const navigate = useNavigate()
    function goToLocation(address){
        console.log(99999)
        console.log(address)
        navigate(address,{
            replace:false
        })
    }
    return (
        <>
        <div id="header">
            <div className={'item'}>FF数字藏品交易系统</div>
            <div className={'item'} onClick={()=>goToLocation('/homepage')}>首页</div>
            <div className={'item'} onClick={()=>goToLocation('/auction')}>数字藏品拍卖市场</div>
            <div className={'item'} onClick={()=>goToLocation('/test')}>数字藏品博物馆</div>
            <div className={'item'} onClick={()=>goToLocation('/trackSource')}>数字藏品溯源</div>
            <div className={'item'} onClick={()=>goToLocation('/my')}>个人中心</div>
        </div>
        </>
    )
}
export default Header;