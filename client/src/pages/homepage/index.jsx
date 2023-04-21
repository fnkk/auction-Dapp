import { Carousel, Button } from 'antd';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
function Homepage() {
    const [nftList, setNftList] = useState([]);
    const navigate = useNavigate()
    const getList = useCallback(() => {
        fetch("http://localhost:3555/getNftList")
            .then(res => res.json())
            .then(json => {
                setNftList([...json])
            });
    }, [])
    useEffect(() => {
        getList()
    }, [getList])
    function goToLocation(address) {
        navigate(address, {
            replace: false
        })
    }
    return (
        <div className="homepage">
            <div className='top_box'>
                <div className="aside">
                    <div className='top'>发现、创造、收藏<br></br>不一样的数字藏品</div>
                    <div className="mid">在眼花缭乱的作品中，与它不期而遇</div>
                    <div className="bottom">
                        <Button type='primary' style={{ marginRight: '25px' }} onClick={() => { goToLocation('../museum') }}>探索</Button>
                        <Button onClick={() => { goToLocation('../addNft') }}>创建</Button>
                    </div>
                </div>
                <div className='content'>
                    <Carousel autoplay>
                        {
                            nftList.map((i, index) => {
                                if (index <= 5) {
                                    return (
                                        <div key={index} onClick={() => { goToLocation('../auction') }}>
                                            <img width={'300px'} height={'350px'} src={i.picUrl ? `http://localhost:8080/ipfs/${i['picUrl']}` : ''} alt="showImg" />
                                        </div>
                                    )
                                }else {
                                    return null;
                                }
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
export default Homepage;