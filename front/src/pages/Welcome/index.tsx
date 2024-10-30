import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, PrimaryButton, Image, SecondaryButton } from "./styles";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src={require("../../assets/images/trashcans.png")} alt="Logo" />
      <Image
        src={require("../../assets/images/revertaifacil.png")}
        alt="Logo"
      />
      <PrimaryButton type="button" onClick={() => navigate("/signin")}>
        Entrar
      </PrimaryButton>
      <SecondaryButton type="button" onClick={() => navigate("/user")}>
        Quero me cadastrar
      </SecondaryButton>
    </Container>
  );
};

export default Welcome;
