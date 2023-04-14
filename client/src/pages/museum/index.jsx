import { Button, Row } from 'antd';
import { useEffect, useState, useCallback } from "react";
import NftItem from "./nftItem";
function Museum() {
    const [nftList,setNftList] = useState([]);
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

    return (
        <>
            <div className="my">
                <h2 style={{ margin: '25px 0' }}>数字藏品博物馆</h2>
                <Row gutter={16}>
                    {
                        nftList.map((item,index)=>{
                            return(
                                <NftItem key={index} i={item}>
                                </NftItem>
                            )
                        })
                    }
                </Row>
            </div>

        </>
    )
}
export default Museum;