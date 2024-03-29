import { useNavigate } from "react-router-dom";
import imgUrl from '../../../img/logo192.png'
import { AppstoreOutlined, MailOutlined, SettingOutlined, BankOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

function Header() {
    const navigate = useNavigate()
    var map = {
        homepage: '首页',
        auction: '数字藏品交易所',
        museum: '数字藏品博物馆',
        trackSource: '数字藏品追溯',
        my: '我的'
    }
    function goToLocation(address, key) {
        var title = address.split('')
        title.shift()
        title = title.join('')
        document.title = `${map[title]}——FF nftTradingSystem`
        setCurrent(key)
        navigate(address, {
            replace: false
        })
    }
    const items = [
        {
            label: '首页',
            key: 'homepage',
            icon: <BankOutlined />
        },
        {
            label: '数字藏品交易所',
            key: 'auction',
            icon: <AppstoreOutlined />
        },
        {
            label: '数字藏品博物馆',
            key: 'museum',
            icon: <MailOutlined />,
        },
        {
            label: '数字藏品追溯',
            key: 'trackSource',
            icon: <AppstoreOutlined />
        },

    ];
    const [current, setCurrent] = useState('homepage');
    const onClick = (e) => {
        console.log(e)
        goToLocation(`/${e.key}`, e.key)
    };
    return (
        <>
            <div id="header">
                <div className={'title'}><img className={'logo'} alt="logo" src={imgUrl}></img>FF数字藏品交易系统</div>
                <div className={'menu'}><Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /></div>
                <div className={'item'} onClick={() => goToLocation('/my', '')}>个人中心</div>
            </div>
        </>
    )
}
export default Header;