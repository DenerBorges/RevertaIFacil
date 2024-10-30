import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import {
  Container,
  ForgotText,
  Input,
  Line,
  MainText,
  Text,
  Link,
  PrimaryButton,
  SocialButton,
  Col,
  Col2,
  Space,
  ButtonEye,
  ContainerIcon,
  ContentWrapper,
  ContainerButton,
} from "./styles";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <a href="/" aria-label="Acesse para voltar">
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </a>
        <MainText>{"Bem-vindo de volta! \r\nFaça seu login"}</MainText>
        <Input type="email" id="email" placeholder="Digite seu email" />
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Digite sua senha"
          />
          <ButtonEye
            type="button"
            className="btn-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        <ForgotText>Esqueceu a senha?</ForgotText>
        <ContainerButton>
          <PrimaryButton type="button" onClick={() => navigate("/home")}>
            Entrar
          </PrimaryButton>
        </ContainerButton>
        <Col2>
          <Line />
          <Text>Ou entre com</Text>
          <Line />
        </Col2>
        <Col>
          <SocialButton type="button">
            <img
              src={require("../../assets/images/White_Facebook.png")}
              alt="Facebook"
              width={30}
            />
          </SocialButton>
          <SocialButton type="button">
            <img
              src={require("../../assets/images/Google__G__logo.png")}
              alt="Google"
              width={30}
            />
          </SocialButton>
        </Col>
        <Space>
          <Text>Ainda não tem uma conta?</Text>
        </Space>
        <Link href="/user" aria-label="Acesse para cadastrar">
          Faça seu cadastro
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default SignIn;
