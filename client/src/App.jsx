import { EthProvider } from "./contexts/EthContext";
import "antd/dist/reset.css";
import "./App.css";
import router from './router';
import Header from "./layout/component/header";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <RouterProvider router={router}></RouterProvider>
    </EthProvider>
  );
}

export default App;
