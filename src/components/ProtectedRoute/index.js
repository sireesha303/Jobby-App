import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {

  const token = Cookies.get("jobby_app_jwt_token");

  // console.log(token);
  if (token === undefined) {
      return <Redirect to="/login"/>;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;