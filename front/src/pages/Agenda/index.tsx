import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

import { Container, ContentWrapper, MainText } from "./styles";

const Agenda: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Agenda</MainText>
        </ContentWrapper>
        <Menu activePage="Agenda" />
      </Container>
    </>
  );
};

export default Agenda;
