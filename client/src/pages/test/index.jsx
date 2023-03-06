import Intro from "../../components/Intro/";
import Added from "../../components/Added/Added";
import Setup from "../../components/Setup/Setup";
import Demo from "../../components/Demo";
import Footer from "../../components/Footer";

function Test(){
    return (
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
    )
}
export default Test;