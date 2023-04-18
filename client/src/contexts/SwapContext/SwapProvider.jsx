import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import SwapContext from "./SwapContext";
import { reducer, actions, initialState } from "./state";

function SwapProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider||"ws://localhost:8546");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract,address }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        // const artifact = require("../../contracts/EcommerceStore.json");
        const artifact = require("../../contracts/NFTSwap.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };
    // console.log('9999*******************************99999999')

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <SwapContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </SwapContext.Provider>
  );
}

export default SwapProvider;
