import { Button, Row, Col, Input, Table } from 'antd';
import { useEffect, useState, useCallback,useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
function TrackSource() {
    const { Search } = Input;
    const [transferList, setTransferList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const columns = [
        {
            title: 'tokenId',
            dataIndex: 'tokenId',
            key: 'tokenId',
            width: '30%',
        },
        {
            title: '交易发起地址',
            dataIndex: 'from',
            key: 'from',
            width: '20%',

        },
        {
            title: '交易接收地址',
            dataIndex: 'to',
            key: 'to',
            width: '20%',
        },
        {
            title: '交易时间',
            dataIndex: 'transferTime',
            width: '30%',
            key: 'transferTime',
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
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
                <Row gutter={16} style={{margin:'35px 0'}}>
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
                <Table columns={columns} dataSource={transferList} />
            </div>
        </>
    )
}
export default TrackSource;