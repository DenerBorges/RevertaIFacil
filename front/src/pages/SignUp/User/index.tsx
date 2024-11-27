import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import {
  BackButton,
  Col,
  Col2,
  Container,
  ContainerButton,
  ContentWrapper,
  ErrorText,
  Input,
  Line,
  Link,
  MainText,
  PrimaryButton,
  RadioContainer,
  RadioGroup,
  SecondaryText,
  SocialButton,
  Space,
  Text,
} from "./styles";

const User: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedOption) {
      setError("Por favor, selecione um tipo de usuário.");
      return;
    }
    setError(null);
    navigate("/personalinfo", { state: { selectedOption } });
  };

  return (
    <Container>
      <ContentWrapper>
        <BackButton
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Acesse para voltar"
        >
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </BackButton>
        <MainText>{"Olá! \r\nVamos começar?"}</MainText>
        <SecondaryText>Por favor, selecione o tipo de usuário</SecondaryText>
        {error && <ErrorText>{error}</ErrorText>}
        <RadioGroup>
          <RadioContainer>
            <Input
              type="radio"
              name="cliente"
              value="cliente"
              checked={selectedOption === "cliente"}
              onChange={() => setSelectedOption("cliente")}
            />
            Cliente
          </RadioContainer>
          <RadioContainer>
            <Input
              type="radio"
              name="fornecedor"
              value="fornecedor"
              checked={selectedOption === "fornecedor"}
              onChange={() => setSelectedOption("fornecedor")}
            />
            Fornecedor
          </RadioContainer>
          <RadioContainer>
            <Input
              type="radio"
              name="distribuidor"
              value="distribuidor"
              checked={selectedOption === "distribuidor"}
              onChange={() => setSelectedOption("distribuidor")}
            />
            Distribuidor
          </RadioContainer>
        </RadioGroup>
        <ContainerButton>
          <PrimaryButton type="button" onClick={handleNext}>
            Avançar
          </PrimaryButton>
        </ContainerButton>
        <Col2>
          <Line />
          <Text>Ou cadastre-se com</Text>
          <Line />
        </Col2>
        <Col>
          <SocialButton type="button">
            <img
              src={require("../../../assets/images/White_Facebook.png")}
              alt="Facebook"
              width={30}
            />
          </SocialButton>
          <SocialButton type="button">
            <img
              src={require("../../../assets/images/Google__G__logo.png")}
              alt="Google"
              width={30}
            />
          </SocialButton>
        </Col>
        <Space>
          <Text>Já possui uma conta?</Text>
        </Space>
        <Link href="/signin" aria-label="Acesse para cadastrar">
          Faça seu login
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default User;
