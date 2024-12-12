import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

import { Container, ContentWrapper, MainText } from "./styles";

const Collections: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Coletas</MainText>
        </ContentWrapper>
        <Menu activePage="Coletas" />
      </Container>
    </>
  );
};

export default Collections;
