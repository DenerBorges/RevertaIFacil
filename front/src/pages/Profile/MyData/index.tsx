import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";

import {
  BackButton,
  CancelButton,
  Col,
  Col2,
  ColButton,
  Container,
  ContentWrapper,
  Input,
  Label,
  PrimaryButton,
  Text,
} from "./styles";

const MyData: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <BackButton
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Acesse para voltar"
          >
            <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
          </BackButton>
          <Col>
            <UserIcon width={30} strokeWidth={2} />
            <Text>Meus dados</Text>
          </Col>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" placeholder="Digite seu email" />
          <Label htmlFor="telephone">Telefone</Label>
          <Input
            type="number"
            id="telephone"
            placeholder="Digite seu telefone"
          />
          <Label htmlFor="cpf/cnpj">CPF/CNPJ</Label>
          <Input type="number" id="cpf/cnpj" placeholder="CPF/CNPJ" />
          <Label htmlFor="cep">CEP</Label>
          <Input type="number" id="cep" placeholder="CEP" />
          <Col2>
            <div>
              <Label htmlFor="number">Número</Label>
              <Input type="text" id="number" placeholder="Número" />
            </div>
            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input type="text" id="complement" placeholder="Complemento" />
            </div>
          </Col2>
          <ColButton>
            <PrimaryButton type="button" onClick={() => navigate("/signin")}>
              Confirmar
            </PrimaryButton>
            <CancelButton type="button" onClick={() => navigate("/")}>
              Excluir Conta
            </CancelButton>
          </ColButton>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MyData;
