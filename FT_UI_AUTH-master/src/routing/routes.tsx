import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/Login/Login";
import { SignUpPage } from "../pages/SignUp/SignUp";
import {ForgotPasswordPage} from "../pages/ForgotPassword/ForgotPassword";

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  </Routes>
);

export default AuthRoutes;
