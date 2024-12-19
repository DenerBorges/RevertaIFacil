import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import api from "../../../utils/api";

import {
  BackButton,
  Col,
  Col2,
  Container,
  ContainerButton,
  ContentWrapper,
  ErrorText,
  GoogleButtonWrapper,
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

  // Google

  const handleButtonClick = () => {
    const googleButton = document.querySelector(
      ".nsm7Bb-HzV7m-LgbsSe"
    ) as HTMLElement;
    googleButton?.click();
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential!) {
      const { credential } = credentialResponse;
      const decodedToken = jwtDecode(credential);

      const { given_name, family_name, email, sub }: any = decodedToken;

      try {
        const existingUserResponse = await api.get("users");
        const existingUserEmails = existingUserResponse.data.map(
          (user: any) => user.email
        );

        if (existingUserEmails.includes(email)) {
          const response = await api.post("login", {
            user: email,
            password: sub,
          });
          const { access_token, user_email } = response.data;

          localStorage.setItem("userToken", access_token);
          localStorage.setItem("userEmail", user_email);
          navigate("/home");
        } else {
          await api.post("users", {
            firstName: given_name,
            lastName: family_name,
            email,
            password: sub,
            profilePic: "https://i.imgur.com/6zvhinZ.png",
            mobile: "",
            document: "",
            zipCode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
          });

          const response = await api.post("login", {
            user: email,
            password: sub,
          });
          const { access_token, user_email } = response.data;

          localStorage.setItem("userToken", access_token);
          localStorage.setItem("userEmail", user_email);
          navigate("/home");
        }
      } catch (error) {
        console.error("Erro ao verificar usuário no banco de dados:", error);
      }
    } else {
      console.error("credentialResponse é undefined");
    }
  };

  // Facebook

  const handleFacebookResponse = (response: any) => {
    if (response.status !== "unknown") {
      console.log("Facebook login successful:", response);
    } else {
      console.error("Facebook login failed");
    }
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
          <FacebookLogin
            appId="9523790070984320"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookResponse}
            textButton=""
            icon=""
            render={(renderProps: any) => (
              <SocialButton
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.isDisabled}
              >
                <img
                  src={require("../../assets/images/White_Facebook.png")}
                  alt="Facebook"
                  width={30}
                />
              </SocialButton>
            )}
          />
          <GoogleButtonWrapper onClick={handleButtonClick}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.error("Login Failed");
              }}
              type="icon"
            />
          </GoogleButtonWrapper>
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
