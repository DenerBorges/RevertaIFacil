import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import {
  ButtonEye,
  Container,
  ContainerButton,
  ContainerIcon,
  ContentWrapper,
  Input,
  MainText,
  PrimaryButton,
  Space,
} from "./styles";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const ResetPass: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <a href="/forgotpassword" aria-label="Acesse para voltar">
          <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
        </a>
        <MainText>Pronto!</MainText>
        <MainText>Crie uma nova senha</MainText>
        <Input type="text" id="code" placeholder="Digite o código recebido" />
        <ContainerIcon>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Digite uma nova senha"
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
            placeholder="Confirme nova senha"
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
            Confirmar
          </PrimaryButton>
        </ContainerButton>
        <Space></Space>
      </ContentWrapper>
    </Container>
  );
};

export default ResetPass;
