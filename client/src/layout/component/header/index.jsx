import { Link, useNavigate } from "react-router-dom";
import imgUrl from '../../../img/logo192.png'
import { AppstoreOutlined, MailOutlined, SettingOutlined, BankOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

function Header() {
    const navigate = useNavigate()
    function goToLocation(address) {
        console.log(address)
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
            label: '数字藏品拍卖系统',
            key: 'auction',
            icon: <AppstoreOutlined />
        },
        {
            label: '数字藏品博物馆',
            key: 'test',
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
        console.log('click ', e);
        setCurrent(e.key);
        goToLocation(`/${e.key}`)
    };
    return (
        <>
            <div id="header">
                <div className={'title'}><img className={'logo'} src={imgUrl}></img>FF数字藏品交易系统</div>
                <div className={'menu'}><Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /></div>
                <div className={'item'} onClick={() => goToLocation('/my')}>个人中心</div>
            </div>
        </>
    )
}
export default Header;