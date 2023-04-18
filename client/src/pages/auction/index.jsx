import { Tabs } from 'antd';
function Auction() {
    const onChange = (key) => {
        console.log(key);
    };
    const actived = () => {
        return (<>
            进行中
        </>)
    }
    const inActived = () => {
        return (<>
            已结束
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