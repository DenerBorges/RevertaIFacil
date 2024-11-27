import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import {
  BackButton,
  Col,
  Col2,
  Container,
  ContainerButton,
  ContentWrapper,
  StyledInputMask,
  Input,
  Link,
  MainText,
  PrimaryButton,
  ErrorText,
} from "./styles";

interface ContactInfoForm {
  document: string;
  mobile: string;
  zipCode: string;
  number: string;
  complement: string;
  profilePic: string;
}

const ContactInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location.state?.formData || {};
  const [formData, setFormData] = useState<ContactInfoForm>({
    ...previousData,
    document: "",
    mobile: "",
    zipCode: "",
    number: "",
    complement: "",
  });
  const [errors, setErrors] = useState<Partial<ContactInfoForm>>({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      profilePic: "https://i.imgur.com/6zvhinZ.png",
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev: ContactInfoForm) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateFields = () => {
    const newErrors: Partial<ContactInfoForm> = {};

    if (formData.document.length < 11 || formData.document.length > 14) {
      newErrors.document = "CPF ou CNPJ incompleto!";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Preencha o telefone!";
    } else if (formData.mobile.length !== 15) {
      newErrors.mobile = "Telefone inválido!";
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "Preencha o CEP!";
    } else if (formData.zipCode.length !== 9) {
      newErrors.zipCode = "CEP inválido!";
    }

    if (!formData.number) {
      newErrors.number = "Preencha o número!";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("users", formData);
      navigate("/signin");
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
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
        <Input
          type="number"
          id="document"
          placeholder="CPF/CNPJ"
          value={formData.document}
          onChange={handleInputChange}
          hasError={!!errors.document}
        />
        {errors.document && <ErrorText>{errors.document}</ErrorText>}
        <StyledInputMask
          type="text"
          mask={"(99) 99999-9999"}
          maskChar={null}
          id="mobile"
          placeholder="Telefone"
          value={formData.mobile}
          onChange={handleInputChange}
          hasError={!!errors.mobile}
        />
        {errors.mobile && <ErrorText>{errors.mobile}</ErrorText>}
        <StyledInputMask
          type="text"
          mask={"99999-999"}
          maskChar={null}
          id="zipCode"
          placeholder="CEP"
          value={formData.zipCode}
          onChange={handleInputChange}
          hasError={!!errors.zipCode}
        />
        {errors.zipCode && <ErrorText>{errors.zipCode}</ErrorText>}
        <Col>
          <Input
            type="text"
            id="number"
            placeholder="Número"
            value={formData.number}
            onChange={handleInputChange}
            hasError={!!errors.number}
          />
          <Input
            type="text"
            id="complement"
            placeholder="Complemento"
            value={formData.complement}
            onChange={handleInputChange}
            hasError={!!errors}
          />
        </Col>
        {errors.number && <ErrorText>{errors.number}</ErrorText>}
        <Col2>
          <Link href="#">
            <CheckCircleIcon width={20} />
            Aceito receber notificações do app
          </Link>
        </Col2>
        <ContainerButton>
          <PrimaryButton type="button" onClick={handleSubmit}>
            Cadastrar
          </PrimaryButton>
        </ContainerButton>
      </ContentWrapper>
    </Container>
  );
};

export default ContactInfo;
