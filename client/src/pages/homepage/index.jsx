// import useEth from "../../contexts/SwapContext/useEth";
import useEth from "../../contexts/EthContext/useEth";

function Homepage() {
    // var a = useSwap();
    var b = useEth();
    
    // console.log('this is a:',a)
    console.log('this is b:',b)
    return (
        <div>
        </div>
    )
}
export default Homepage;