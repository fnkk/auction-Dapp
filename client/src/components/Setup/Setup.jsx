import Product from "./Product";
import useEth from "../../contexts/EthContext/useEth";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";

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
  getTotal()
  return (
    <>
      {/* <button onClick={getTotal}>get total</button> */}
      {
        function () {
          let res = []
          for (let i = total; i >= 2; i--) {
            res.push((<Product key={i} i={i}></Product>))
          }
          return res
        }()
      }
    </>
  );
}

export default Setup;
