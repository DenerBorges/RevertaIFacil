import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/api";

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
  Col3,
  Space,
  ButtonEye,
  ContainerIcon,
  ContentWrapper,
  ContainerButton,
  BackButton,
  ErrorText,
  GoogleButtonWrapper,
} from "./styles";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "O email é obrigatório!";
    if (!password) newErrors.password = "A senha é obrigatória!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post(`login`, { user: email, password });
      const { access_token, user_email } = response.data;

      localStorage.setItem("userToken", access_token);
      localStorage.setItem("userEmail", user_email);
      navigate("/home");
    } catch (error: any) {
      setErrors({
        ...errors,
        api: "Seu email ou senha estão incorretos!",
      });
    }
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

  return (
    <Container>
      <ContentWrapper>
        <BackButton
          type="button"
          onClick={() => navigate("/")}
          aria-label="Acesse para voltar"
        >
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </BackButton>
        <MainText>{"Bem-vindo de volta! \r\nFaça seu login"}</MainText>
        <Input
          type="email"
          id="email"
          placeholder="Digite seu email"
          value={email || ""}
          onChange={(e) => [setEmail(e.target.value)]}
          hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Digite sua senha"
            value={password || ""}
            onChange={(e) => [setPassword(e.target.value)]}
            hasError={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <ButtonEye
            type="button"
            className="btn-eye"
            onClick={() => setShowPassword(!showPassword)}
            hasError={!!errors.password}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        <Col3>
          <ForgotText href="/forgotpassword" aria-label="Esqueci a senha">
            Esqueceu a senha?
          </ForgotText>
        </Col3>
        {errors.api && <ErrorText>{errors.api}</ErrorText>}
        <ContainerButton>
          <PrimaryButton type="button" onClick={handleLogin}>
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
