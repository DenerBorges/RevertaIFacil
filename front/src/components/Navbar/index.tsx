import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Logo, ProfileImage } from "./styles";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent }) => {
  const navigate = useNavigate();

  return (
    <Container transparent={transparent}>
      <Logo
        src={require("../../assets/images/logo192.png")}
        alt="Logo do App"
        onClick={() => navigate("/home")}
      />
      <ProfileImage
        src={require("../../assets/images/White_Facebook.png")}
        alt="Foto de perfil"
        onClick={() => navigate("/profile")}
      />
    </Container>
  );
};

export default Navbar;
