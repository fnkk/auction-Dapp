import { Tabs, Row } from 'antd';
import NftItem from './nftItem';
import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState, useCallback } from 'react';
function Auction() {
    const {state:{contract,accounts}} = useEth()
    const [activedList, setActivedList] = useState([])
    const [inactivedList, setInActivedList] = useState([])
    const [selledList, setSelledList] = useState([])
    const [buyedList, setBuyedList] = useState([])
    const onChange = (key) => {
        console.log(key);
    };
    const getActivedSwapList = useCallback(() => {
        if(contract){
            fetch(`http://localhost:3555/getActivedSwapList`)
            .then(res => res.json())
            .then(json => {
                setActivedList([...json])
            });
            fetch(`http://localhost:3555/getInactivedSwapList`)
            .then(res => res.json())
            .then(json => {
                setInActivedList([...json])
            });
            fetch(`http://localhost:3555/getSwapListBySellerAddress?address=${accounts[0]}`)
            .then(res => res.json())
            .then(json => {
                setSelledList([...json])
            });
            fetch(`http://localhost:3555/getSwapListByBuyerAddress?address=${accounts[0]}`)
            .then(res => res.json())
            .then(json => {
                setBuyedList([...json])
            });
        }
        
    }, [contract,accounts])
    useEffect(() => {
        getActivedSwapList()
    }, [getActivedSwapList])
    const actived = () => {
        return (<>
            {/* <button onClick={() => test()}>test</button> */}
            <Row gutter={16}>
                {activedList.map((item) => {
                    return (<NftItem key={item.tokenId} i={item} getActivedSwapList={getActivedSwapList}>
                    </NftItem>)
                })}
            </Row>
        </>)
    }
    const inActived = () => {
        return (<>
            <Row gutter={16}>
                {inactivedList.map((item) => {
                    return (<NftItem key={item.tokenId} i={item}>
                    </NftItem>)
                })}
            </Row>
        </>)
    }
    const selled = () => {
        return (<>
            <Row gutter={16}>
                {selledList.map((item) => {
                    return (<NftItem key={item.tokenId} i={item} getActivedSwapList={getActivedSwapList}>
                    </NftItem>)
                })}
            </Row>
        </>)
    }
    const buyed = () => {
        return (<>
            <Row gutter={16}>
                {buyedList.map((item) => {
                    return (<NftItem key={item.tokenId} i={item}>
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
        },
        {
            key: '3',
            label: `我出售的`,
            children: selled(),
        },
        {
            key: '4',
            label: `我购买的`,
            children: buyed(),
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