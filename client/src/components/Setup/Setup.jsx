import Product from "./Product";
import NftItem from "../../pages/my/nftItem";
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function Setup() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [total, setTotal] = useState(0);
  var getTotal = async () => {
    console.log('get total',contract)
    if (contract) {
      const value = await contract.methods.productIndex().call()
      setTotal(value)
    }
  }
  useEffect(()=>{
     getTotal()
  })
 
  return (
    <>
      {/* <button onClick={getTotal}>get total</button> */}
      {
        function () {
          let res = []
          for (let i = total; i >= 1; i--) {
            res.push((<Product key={i} i={i}></Product>))
            res.push((<NftItem key={10+i} i={i}></NftItem>))
          }
          return res
        }()
      }
    </>
  );
}

export default Setup;
