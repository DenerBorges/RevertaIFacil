import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BackButton,
  ButtonEye,
  Container,
  ContainerButton,
  ContainerIcon,
  ContentWrapper,
  ErrorText,
  Input,
  MainText,
  PrimaryButton,
  Space,
} from "./styles";
import api from "../../../utils/api";

const ResetPass: React.FC = () => {
  const location = useLocation();
  const { email } = location.state;
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!resetCode) {
      newErrors.resetCode = "Preencha o campo de código!";
    }
    if (!password) {
      newErrors.password = "Preencha o campo de senha!";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres!";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem!";
    }

    return newErrors;
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("reset-password", {
        email,
        resetCode,
        password,
      });
      toast.success("Senha alterada com sucesso!\nRedirecionando para login", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (error) {
      toast.error(
        "O código de recuperação está errado. Por favor tente novamente."
      );
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
        <MainText>Pronto!</MainText>
        <MainText>Crie uma nova senha</MainText>
        <Input
          type="text"
          id="code"
          placeholder="Digite o código recebido"
          value={resetCode || ""}
          onChange={(e) => setResetCode(e.target.value)}
          hasError={!!errors.resetCode}
        />
        {errors.resetCode && <ErrorText>{errors.resetCode}</ErrorText>}
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Digite uma nova senha"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
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
        <ContainerIcon>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            placeholder="Confirme nova senha"
            value={confirmPassword || ""}
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
            hasError={!!errors.password}
          >
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonEye>
        </ContainerIcon>
        <ContainerButton>
          <PrimaryButton type="button" onClick={handleReset}>
            Confirmar
          </PrimaryButton>
        </ContainerButton>
        <Space></Space>
        <ToastContainer autoClose={3000} className="custom-toast" />
      </ContentWrapper>
    </Container>
  );
};

export default ResetPass;
