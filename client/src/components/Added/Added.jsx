import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import { Button, DatePicker, Space, Form, Input } from 'antd';

function Added() {
    const buttonStyle={
        marginRight:"15px"
    }
    const { state: { contract, accounts, web3 } } = useEth();
    function test(){
        console.log(web3.utils.toWei('1'))
    }
    const [product,setProduct] = useState({
        name: '',
        cate: '',
        des: '',
        startTime: '',
        endTime: ''
    });
    const { RangePicker } = DatePicker;
    const addProductInStore = async() => {
        // 为何调用web3对象放到外层会获取不到，useEth究竟在何时拉取state的值？？
        const amt_1 = web3.utils.toWei('1');
        const res = await contract.methods.addProductToStore(product.name,product.cate,'imagelink',product.des,product.startTime,product.endTime,amt_1,0).send({ from: accounts[0] });
        console.log(res)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        setProduct(()=>{
            return {...product,...values}
        })
        console.log('product is ' ,product)
        // 完成表单的数据收集，开始调用合约，添加product到store中
        // addProductInStore()
        // 在这里执行send操作会读取不到表单收集的值，因为setState是异步的，所以要怎么处理呢？？？
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        var startTime = Date.parse(dateString[0])/1000
        var endTime = Date.parse(dateString[1])/1000
        setProduct(()=>{
            return {...product,startTime,endTime}
        })
      };


    return (
        <>  
            <button onClick={test}>test</button>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input it!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="cate"
                    name="cate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input it!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="des"
                    name="des"
                    rules={[
                        {
                            required: true,
                            message: 'Please input it!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="startTime"
                    rules={[
                        {
                            required: true,
                            message: 'Please input it!',
                        },
                    ]}
                >
                    <Space direction="vertical" size={12}>
                        <RangePicker onChange={onChange} showTime />
                    </Space>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={buttonStyle}>
                        保存
                    </Button>
                    <Button type="primary" onClick={addProductInStore}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Added;