import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { userType } from "../../../types/user";

import {
  BackButton,
  ButtonEye,
  Col,
  Col2,
  Container,
  ContainerButton,
  ContainerIcon,
  ContentWrapper,
  ErrorText,
  Input,
  Line,
  Link,
  MainText,
  PrimaryButton,
  SocialButton,
  Text,
} from "./styles";

const PersonalInfo: React.FC = () => {
  const { state } = useLocation();
  const selectedOption = state?.selectedOption;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<Partial<userType>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isClient: false,
    isCollector: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        isClient: selectedOption === "cliente",
        isCollector:
          selectedOption === "fornecedor" || selectedOption === "distribuidor",
      }));
    }
  }, [selectedOption]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) {
      newErrors.firstName = "Preencha o campo de primeiro nome!";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Preencha o campo de último nome!";
    }
    if (!formData.email) {
      newErrors.email = "Preencha o campo de email!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Insira um e-mail válido!";
    }
    if (!formData.password) {
      newErrors.password = "Preencha o campo de senha!";
    } else if (formData.password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres!";
    }
    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateFields()) return;

    navigate("/contactinfo", { state: { formData } });
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
        <Input
          type="text"
          id="firstName"
          placeholder="Primeiro nome"
          value={formData.firstName || ""}
          onChange={handleInputChange}
          hasError={!!errors.firstName}
        />
        {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
        <Input
          type="text"
          id="lastName"
          placeholder="Último nome"
          value={formData.lastName || ""}
          onChange={handleInputChange}
          hasError={!!errors.lastName}
        />
        {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleInputChange}
          hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Senha"
            value={formData.password || ""}
            onChange={handleInputChange}
            hasError={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            hasError={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
          <ButtonEye
            type="button"
            className="btn-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        {errors.api && <ErrorText>{errors.api}</ErrorText>}
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
        <Text>Já possui uma conta?</Text>
        <Link href="/signin" aria-label="Acesse para logar">
          Faça seu login
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default PersonalInfo;
