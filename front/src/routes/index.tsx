import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import User from "../pages/SignUp/User";
import Home from "../pages/Home";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Fragment>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
