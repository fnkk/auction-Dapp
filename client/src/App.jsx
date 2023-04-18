import { EthProvider } from "./contexts/EthContext";
import { SwapProvider } from "./contexts/SwapContext";
import "antd/dist/reset.css";
import "./App.scss";
import router from './router';
import Header from "./layout/component/header";
import { RouterProvider } from "react-router-dom";
import { message } from "antd";

function App() {
  message.config({
    top: 50
  })
  return (
    <SwapProvider>
      <EthProvider>
        <RouterProvider router={router}></RouterProvider>
      </EthProvider>
    </SwapProvider>
  );
}

export default App;
