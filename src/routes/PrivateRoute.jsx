import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>;
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} replace={true}></Navigate>;
};

export default PrivateRoute;
