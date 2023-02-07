import Product from "./Product";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


function Setup() {
  const { state: { contract, accounts } } = useEth();
  const [ total, setTotal ] = useState([1,2,3,4]);
  return (
    <>
      {
       total.map(item=>{
        return(<Product i={item} key={item}></Product>)
       })        
      }
    </>
  );
}

export default Setup;
