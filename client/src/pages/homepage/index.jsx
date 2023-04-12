import { useRef, useState, useEffect } from "react";
// 导入ipfs
import IpfsApi from "ipfs-api";
// 创建ipfs实例（要启动ipfs daemon服务）
var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })

function Homepage() {
    useEffect(() => {
        document.title = 'ff数字藏品交易系统'
    }, [])
    const fileid = useRef(null);
    const [picHash, setPicHash] = useState('');
    const upload = async (info) => {
        let reader = new FileReader()
        reader.readAsArrayBuffer(info)

        reader.onloadend = () => {
            console.log("result : ", reader.result)
            saveToIpfs(reader.result).then(hash => {
                console.log("hash : ", hash)
                setPicHash(hash)
            })
        }
    }

    const saveToIpfs = (data) => {
        const buffer = Buffer.from(data)
        return new Promise(async (resolve, reject) => {
            try {
                let res = await ipfs.add(buffer)
                let hash = res[0].hash
                console.log('hash is:', hash)
                resolve(hash)
            } catch (e) {
                console.log('出错了！！！')
                reject(e)
            }
        })
    }

    return (
        <div>
            <h2>请上传图片：</h2>
            <div>
                <input type='file' ref={fileid} />
            </div>
            <button onClick={() => {
                console.log(fileid.current.files[0])
                upload(fileid.current.files[0])
            }}>点击我上传到ipfs</button>
            {
                picHash && <h3>图片已经上传到IPFS：{picHash}</h3>
            }
            {
                picHash && <img src={"http://localhost:8080/ipfs/" + picHash} />
            }

        </div>
    )
}
export default Homepage;