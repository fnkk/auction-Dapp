import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Added from "./components/Added/Added";
import Setup from "./components/Setup/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
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
