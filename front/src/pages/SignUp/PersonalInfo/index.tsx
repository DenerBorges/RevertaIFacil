import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import {
  ButtonEye,
  Col,
  Col2,
  Container,
  ContainerButton,
  ContainerIcon,
  ContentWrapper,
  Input,
  Line,
  Link,
  MainText,
  PrimaryButton,
  SocialButton,
  Text,
} from "./styles";

const PersonalInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <a href="/user" aria-label="Acesse para voltar">
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </a>
        <MainText>{"Olá! \r\nVamos começar?"}</MainText>
        <Input type="text" id="name" placeholder="Primeiro nome" />
        <Input type="text" id="name2" placeholder="Último nome" />
        <Input type="email" id="email" placeholder="Email" />
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Senha"
          />
          <ButtonEye
            type="button"
            className="btn-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        <ContainerIcon>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            placeholder="Confirme a senha"
          />
          <ButtonEye
            type="button"
            className="btn-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        <ContainerButton>
          <PrimaryButton type="button" onClick={() => navigate("/contactinfo")}>
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
        <Text>Já possui uma conta?</Text>
        <Link href="/signin" aria-label="Acesse para logar">
          Faça seu login
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default PersonalInfo;
