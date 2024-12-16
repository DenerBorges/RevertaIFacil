import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import api from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BackButton,
  Container,
  ContainerButton,
  ContentWrapper,
  ErrorText,
  Input,
  Link,
  MainText,
  PrimaryButton,
  SecondaryText,
  Space,
  Text,
} from "./styles";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Preencha o campo de email!";
      setIsButtonDisabled(false);
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Insira um e-mail válido!";
      setIsButtonDisabled(false);
    }

    return newErrors;
  };

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post(`forgot-password`, {
        email,
      });
      toast.success(
        "Código de recuperação de senha enviado para seu email com sucesso!",
        {
          position: "top-right",
          autoClose: 3000,
          className: "custom-toast",
        }
      );
      setTimeout(() => {
        navigate("/resetpassword", { state: { email } });
      }, 4000);
    } catch (error) {
      toast.error("O email não foi encontrado. Verifique e tente novamente.");
      setIsButtonDisabled(false);
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
        <MainText>Esqueceu sua senha?</MainText>
        <SecondaryText>
          {"Por favor, insira o email vinculado\r\n a sua conta"}
        </SecondaryText>
        <Input
          type="email"
          id="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <ContainerButton>
          <PrimaryButton
            type="button"
            onClick={handleEmail}
            disabled={isButtonDisabled}
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
        <ToastContainer autoClose={3000} className="custom-toast" />
      </ContentWrapper>
    </Container>
  );
};

export default ForgotPass;
