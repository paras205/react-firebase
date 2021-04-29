import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../store/actions/auth";

import { RootState } from "../store/index";
import Message from "../components/UI/Message";

const Dashboard: FC = () => {
  const { success, user, needVerification } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);
  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Plase verify your email address" />
        )}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
      </div>
    </section>
  );
};

export default Dashboard;
