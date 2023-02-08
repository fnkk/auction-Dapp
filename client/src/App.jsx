import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Added from "./components/Added/Added";
import Setup from "./components/Setup/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <Added />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
