import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import ForgotPass from "../pages/ForgotPassword/ForgotPass";
import ResetPass from "../pages/ForgotPassword/ResetPass";
import User from "../pages/SignUp/User";
import PersonalInfo from "../pages/SignUp/PersonalInfo";
import ContactInfo from "../pages/SignUp/ContactInfo";
import Home from "../pages/Home";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Fragment>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/resetpassword" element={<ResetPass />} />
          <Route path="/user" element={<User />} />
          <Route path="/personalinfo" element={<PersonalInfo />} />
          <Route path="/contactinfo" element={<ContactInfo />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
