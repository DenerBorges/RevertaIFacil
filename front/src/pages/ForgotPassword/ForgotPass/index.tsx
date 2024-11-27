import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import {
  BackButton,
  Container,
  ContainerButton,
  ContentWrapper,
  Input,
  Link,
  MainText,
  PrimaryButton,
  SecondaryText,
  Space,
  Text,
} from "./styles";

const ForgotPass: React.FC = () => {
  const navigate = useNavigate();

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
        <MainText>Esqueceu sua senha?</MainText>
        <SecondaryText>
          {"Por favor, insira o email vinculado\r\n a sua conta"}
        </SecondaryText>
        <Input type="email" id="email" placeholder="Digite seu email" />
        <ContainerButton>
          <PrimaryButton
            type="button"
            onClick={() => navigate("/resetpassword")}
          >
            Enviar código
          </PrimaryButton>
        </ContainerButton>
        <Space>
          <Text>Lembrou da senha?</Text>
        </Space>
        <Link href="/signin" aria-label="Acesse para logar">
          Faça seu login
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default ForgotPass;
