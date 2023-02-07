import Product from "./Product";
import useEth from "../../contexts/EthContext/useEth";


function Setup() {
  const { state } = useEth();
  return (
    <>
      <Product></Product>
    </>
  );
}

export default Setup;
