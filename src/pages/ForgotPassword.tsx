import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  sendPasswordResetEmail,
  setError,
  setLoading,
  setSuccess
} from "../store/actions/auth";
import { RootState } from "../store/index";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Message from "../components/UI/Message";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (error) {
      dispatch(setError(""));
    }
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [error, dispatch, success]);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email send"));
    setLoading(false);
  };
  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset Password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
            label="Email"
          />
          <Button
            text={loading ? "Loading" : "send password reset email"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
