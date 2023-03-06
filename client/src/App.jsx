import { EthProvider } from "./contexts/EthContext";
import "antd/dist/reset.css";
import "./App.css";
import router from './router';
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <RouterProvider router={router}></RouterProvider>
      </div>
    </EthProvider>
  );
}

export default App;
