import { useContext } from "react";
import SwapContext from "./SwapContext";

const useSwap = () => useContext(SwapContext);

export default useSwap;
