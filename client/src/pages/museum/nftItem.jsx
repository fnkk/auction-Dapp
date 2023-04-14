import { Col, Card } from 'antd';
const { Meta } = Card;
function NftItem({ i }) {
    return (
        <>
            <Col className="nft-item" span={8}>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img width={"200px"} alt="tupian" src={i.picUrl ? `http://localhost:8080/ipfs/${i['picUrl']}` : ''} />}
                >
                    <div className={"item"}><span className='title'>名称：</span>{i.name}</div>
                    <Meta title="简介" className="名称" description={i.introduction} />
                </Card>
            </Col>
        </>
    )
}
export default NftItem;