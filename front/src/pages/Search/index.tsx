import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";

import { Container, ContentWrapper, MainText } from "./styles";

const Search: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Busca</MainText>
        </ContentWrapper>
        <Menu activePage="Busca" />
      </Container>
    </>
  );
};

export default Search;
