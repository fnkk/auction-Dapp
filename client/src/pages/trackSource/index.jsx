import { Button, Row, Col, Input } from 'antd';
import { useEffect, useState, useCallback } from "react";
function TrackSource() {
    const { Search } = Input;
    const [transferList,setTransferList] = useState([]);
    const onSearch = (value) => {
        console.log(value)
        getTransferListById(value)
    };
    const getTransferListById=(tokenId)=>{
        fetch(`http://localhost:3555/getTransferListById?tokenId=${tokenId}`)
            .then(res => res.json())
            .then(json => {
                setTransferList([...json])
            });
    }
    return (
        <>
            <div className="my">
                <h2 style={{ margin: '25px 0' }}>数字藏品溯源</h2>
                <Row gutter={16}>
                    <Col span={24}>
                        <Search
                            placeholder="请输入要溯源的数字藏品的tokenId"
                            allowClear
                            enterButton="查询"
                            size="large"
                            onSearch={onSearch}
                        />
                    </Col>

                </Row>
            </div>
        </>
    )
}
export default TrackSource;