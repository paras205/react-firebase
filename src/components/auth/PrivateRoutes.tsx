import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { RootState } from "../../store/index";

interface Props extends RouteProps {
  component: any;
}

const PrivateRoutes: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    ></Route>
  );
};

export default PrivateRoutes;
