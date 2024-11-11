import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

import { Container, ContentWrapper, MainText } from "./styles";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Home</MainText>
        </ContentWrapper>
        <Menu activePage="Home" />
      </Container>
    </>
  );
};

export default Home;
