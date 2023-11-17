import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const Root = () => {
  return (
    <div className="">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Root;
