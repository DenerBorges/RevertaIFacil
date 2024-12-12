import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

import { Container, ContentWrapper, MainText } from "./styles";

const Map: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Mapa</MainText>
        </ContentWrapper>
        <Menu activePage="Mapa" />
      </Container>
    </>
  );
};

export default Map;
