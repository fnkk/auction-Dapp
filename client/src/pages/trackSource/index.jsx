import { Row, Col, Input, Table } from 'antd';
import { useState } from "react";
import useSwap from "../../contexts/SwapContext/useSwap"
import toDate from "../../utils/toDate"
function TrackSource() {
    const { Search } = Input;
    const [transferList, setTransferList] = useState([]);
    const { state: { address } } = useSwap();
    const columns = [
        {
            title: 'tokenId',
            dataIndex: 'tokenId',
            key: '_id',
            width: '30%',
        },
        {
            title: '交易发起地址',
            dataIndex: 'from',
            key: '_id',
            width: '20%',

        },
        {
            title: '交易接收地址',
            dataIndex: 'to',
            key: '_id',
            width: '20%',
        },
        {
            title: '交易时间',
            dataIndex: 'transferTime',
            width: '40%',
            key: '_id',
            sorter: (a, b) => a.transferTime - b.transferTime,
            sortDirections: ['descend', 'ascend'],
            render: (val) => {
                return (<>
                    {toDate(val)}
                </>)
            }
        },
    ];
    const onSearch = (value) => {
        console.log(value)
        getTransferListById(value)
    };
    const getTransferListById = (tokenId) => {
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
                <Row gutter={16} style={{ margin: '35px 0' }}>
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
                <h3>注：本交易系统的合约地址为{address}</h3>
                <Table columns={columns} dataSource={transferList} rowKey={columns => columns._id} />
            </div>
        </>
    )
}
export default TrackSource;