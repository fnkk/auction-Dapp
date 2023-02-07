import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [productId, setProductId] = useState("");
  console.log('contarc in test ',contract)
  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  const handleProductIdChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setProductId(e.target.value);
    }
  };

  // const read = async () => {
  //   console.log('accounts:',accounts,contract.methods);
  //   const value = await contract.methods.read().call({ from: accounts[0] });
  //   setValue(value);
  // }
  const readProduct = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (productId === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(productId);
    const value = await contract.methods.getProduct(newValue).call({ from: accounts[0] });
    console.log(value)
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={readProduct} className="input-btn">
        read(<input 
          type="text"
          placeholder="productId"
          value={productId}
          onChange={handleProductIdChange}
        />)
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
