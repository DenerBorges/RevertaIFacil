import React from "react";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import {
  Col,
  Col2,
  Container,
  ContainerButton,
  ContentWrapper,
  Input,
  Link,
  MainText,
  PrimaryButton,
} from "./styles";
import { useNavigate } from "react-router-dom";

const ContactInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <a href="/personalinfo" aria-label="Acesse para voltar">
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </a>
        <MainText>{"Olá! \r\nVamos começar?"}</MainText>
        <Input type="number" id="cpf/cnpj" placeholder="CPF/CNPJ" />
        <Input type="number" id="telephone" placeholder="Telefone" />
        <Input type="number" id="cep" placeholder="CEP" />
        <Col>
          <Input type="text" id="number" placeholder="Número" />
          <Input type="text" id="complement" placeholder="Complemento" />
        </Col>
        <Col2>
          <Link href="#">
            <CheckCircleIcon width={20} />
            Aceito receber notificações do app
          </Link>
        </Col2>
        <ContainerButton>
          <PrimaryButton type="button" onClick={() => navigate("/home")}>
            Cadastrar
          </PrimaryButton>
        </ContainerButton>
      </ContentWrapper>
    </Container>
  );
};

export default ContactInfo;
