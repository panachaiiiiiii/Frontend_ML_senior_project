
import InspectDesktop from "../Component/Inspect/InspectDesktop";
import Inspectmobile from "../Component/Inspect/Inspectmobile";

const Inspect = () => {

  return (
    <div >
      <div className="hidden md:flex flex-col mt-8  items-center justify-center"><InspectDesktop /></div>
      <div className="md:hidden"><Inspectmobile /></div>
    </div>
  );
};

export default Inspect;
