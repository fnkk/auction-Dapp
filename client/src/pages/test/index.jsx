import Added from "../../components/Added/Added";
import Setup from "../../components/Setup/Setup";
import Demo from "../../components/Demo";

function Test() {
  return (
    <div className="container">
      <Demo />
      <hr />
      <Added />
      <hr />
      <Setup />
      {/* <hr /> */}
    </div>
  )
}
export default Test;