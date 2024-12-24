import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
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

  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    try {
      const { access_token } = tokenResponse;

      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userInfo = await userInfoResponse.json();

      const { given_name, family_name, email, id: sub } = userInfo;

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
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => {
      console.error("Login Failed");
    },
  });

  // Facebook

  const handleFacebookResponse = async (response: any) => {
    if (response.status !== "unknown") {
      try {
        console.log("Resposta do Facebook:", response);
        const graphResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${response.accessToken}`
        );
        const userData = await graphResponse.json();

        console.log("Dados do usuário do Facebook:", userData);
        const { email, name, id: facebookId, picture } = response;

        const [firstName, ...lastNameArray] = name.split(" ");
        const lastName = lastNameArray.join(" ");

        const existingUserResponse = await api.get("users");
        const existingUserEmails = existingUserResponse.data.map(
          (user: any) => user.email
        );

        if (existingUserEmails.includes(email)) {
          const loginResponse = await api.post("login", {
            user: email,
            password: facebookId,
          });

          const { access_token, user_email } = loginResponse.data;

          localStorage.setItem("userToken", access_token);
          localStorage.setItem("userEmail", user_email);
          navigate("/home");
        } else {
          await api.post("users", {
            firstName,
            lastName,
            email,
            password: facebookId,
            profilePic: picture?.data?.url || "https://i.imgur.com/6zvhinZ.png",
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

          const loginResponse = await api.post("login", {
            user: email,
            password: facebookId,
          });

          const { access_token, user_email } = loginResponse.data;

          localStorage.setItem("userToken", access_token);
          localStorage.setItem("userEmail", user_email);
          navigate("/home");
        }
      } catch (error) {
        console.error(
          "Erro ao processar o login/cadastro com o Facebook:",
          error
        );
      }
    } else {
      console.error("Falha no login com o Facebook.");
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
          <FacebookLogin
            appId="9523790070984320"
            autoLoad={false}
            fields="name,email,picture"
            onSuccess={handleFacebookResponse}
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
          <SocialButton type="button" onClick={() => googleLogin()}>
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
