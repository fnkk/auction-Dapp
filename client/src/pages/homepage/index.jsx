import useSwap from "../../contexts/SwapContext/useSwap"
import useEth from "../../contexts/EthContext/useEth";

function Homepage() {
    const { state: { contract, accounts, web3, address } } = useEth();
    const { state: { contract: swapContract, address: swapAddress } } = useSwap();

    const test = async() => {
        console.log(contract)
        console.log(swapContract)
    }   
    return (
        <div>
            <button onClick={() => { test() }}>test</button>
        </div>
    )
}
export default Homepage;