import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h2 className="text-center">
        Oops!! <br />
        You are lost!
      </h2>
      <Link to={"/"}>
        <button className="underline">Go Back</button>
      </Link>
    </div>
  );
};

export default NotFound;
