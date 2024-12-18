import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import ForgotPass from "../pages/ForgotPassword/ForgotPass";
import ResetPass from "../pages/ForgotPassword/ResetPass";
import User from "../pages/SignUp/User";
import PersonalInfo from "../pages/SignUp/PersonalInfo";
import ContactInfo from "../pages/SignUp/ContactInfo";
import Profile from "../pages/Profile/ProfileHome";
import MyData from "../pages/Profile/MyData";
import Notifications from "../pages/Profile/Notifications";
import Help from "../pages/Profile/Help";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Search from "../pages/Search";
import Collections from "../pages/Collections";
import Agenda from "../pages/Agenda";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GoogleOAuthProvider clientId="74303786643-964ha739pfroom3uf2doim3rt3joqs2d.apps.googleusercontent.com">
        <Fragment>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPass />} />
            <Route path="/resetpassword" element={<ResetPass />} />
            <Route path="/user" element={<User />} />
            <Route path="/personalinfo" element={<PersonalInfo />} />
            <Route path="/contactinfo" element={<ContactInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mydata" element={<MyData />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/search" element={<Search />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
        </Fragment>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default RoutesApp;
