import { useNavigate } from "react-router-dom";
function My() {
    const navigate = useNavigate()

    const goToAddNft = () => {
        navigate('/addNft', {
            replace: false
        })
    }
    return (
        <>
            我的页面
            <button onClick={() => { goToAddNft() }}>创建NFT</button>
        </>
    )
}
export default My;