import { Tabs, Row } from 'antd';
import NftItem from './nftItem';
import { useState } from 'react';
function Auction() {
    const [activedList,setActivedList] = useState([])
    const [inactivedList,setInActivedList] = useState([])
    const onChange = (key) => {
        console.log(key);
    };
    const actived = () => {
        return (<>
            <Row gutter={16}>
                    {activedList.map((item) => {
                        return (<NftItem key={item} i={item}>
                        </NftItem>)
                    })}
                </Row>
        </>)
    }
    const inActived = () => {
        return (<>
            <Row gutter={16}>
                    {inactivedList.map((item) => {
                        return (<NftItem key={item} i={item}>
                        </NftItem>)
                    })}
                </Row>
        </>)
    }
    const items = [
        {
            key: '1',
            label: `进行中`,
            children: actived(),
        },
        {
            key: '2',
            label: `已完成`,
            children: inActived(),
        }
    ];

    return (
        <div className="my">
            <h2 style={{ margin: '25px 0' }}>数字藏品交易所</h2>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
export default Auction;