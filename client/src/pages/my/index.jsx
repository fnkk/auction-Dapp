import { useNavigate } from "react-router-dom";
import { Button, message, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
function My() {
    const navigate = useNavigate()
    const goToAddNft = () => {
        navigate('/addNft', {
            replace: false
        })
    }
    const style = {
        background: '#0092ff',
        padding: '8px 0',
      };
    return (
        <>
            <div className="container">
                <h2 style={{margin:'25px 0'}}>我的数字藏品</h2>
                <Button type="primary" onClick={() => { goToAddNft() }} style={{margin:'25px 0'}}><PlusOutlined />创建NFT</Button>
                <Row gutter={16}>
                    <Col className="nft-item" span={8}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="nft-item" span={8}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="nft-item" span={8}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="nft-item" span={8}>
                        <div style={style}>col-6</div>
                    </Col>
                </Row>
            </div>

        </>
    )
}
export default My;