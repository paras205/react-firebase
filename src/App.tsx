import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";

import firebase from "./firebase/config";
import {
  getUserById,
  setLoading,
  setNeedVerification
} from "./store/actions/auth";
import { RootState } from "./store/index";

import PrivateRoutes from "./components/auth/PrivateRoutes";
import PublicRoutes from "./components/auth/PublicRoutes";

import Header from "./components/sections/Header";
import Loader from "./components/UI/Loader";

import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoutes path="/" component={Homepage} exact />
        <PublicRoutes path="/signup" component={Signup} exact />
        <PublicRoutes path="/signin" component={SignIn} exact />
        <PublicRoutes
          path="/forgot-password"
          component={ForgotPassword}
          exact
        />
        <PrivateRoutes path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
