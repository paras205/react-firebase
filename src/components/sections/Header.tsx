import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/index";
import Button from "../UI/Button";
import { signout } from "../../store/actions/auth";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const logoutClickHandler = () => {
    dispatch(signout());
  };
  return (
    <nav className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={!authenticated ? "/" : "/dashboard"}
          >
            AppName
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-items">
            {!authenticated ? (
              <div className="buttons">
                <Button
                  text="Sign Up"
                  onClick={() => history.push("/signup")}
                  className="is-primary"
                />
                <Button
                  text="Sign In"
                  onClick={() => history.push("/signin")}
                  className="is-primary"
                />
              </div>
            ) : (
              <Button text="Sign Out" onClick={logoutClickHandler} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
