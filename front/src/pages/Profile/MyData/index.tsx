import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { userType } from "../../../types/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BackButton,
  CancelButton,
  Col,
  Col2,
  ColButton,
  Container,
  ContentWrapper,
  ErrorText,
  Input,
  Label,
  PrimaryButton,
  StyledInputMask,
  Text,
} from "./styles";

const MyData: React.FC = () => {
  const [profile, setProfile] = useState<userType>();
  // const [profilePic, setProfilePic] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [document, setDocument] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      // setProfilePic(response.data.profilePic);
      // setFirstName(response.data.firstName);
      // setLastName(response.data.lastName);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setDocument(response.data.document);
      setZipCode(response.data.zipCode);
      setNumber(response.data.number);
      setComplement(response.data.complement);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!formData.firstName) {
    //   newErrors.firstName = "Preencha o campo de primeiro nome!";
    // }

    // if (!formData.lastName) {
    //   newErrors.lastName = "Preencha o campo de último nome!";
    // }

    if (!email) {
      newErrors.email = "Preencha o campo de email!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Insira um e-mail válido!";
    }

    if (!mobile) {
      newErrors.mobile = "Preencha o telefone!";
    } else if (mobile.length !== 15) {
      newErrors.mobile = "Telefone inválido!";
    }

    if (document.length < 11 || document.length > 14) {
      newErrors.document = "CPF ou CNPJ incompleto!";
    }

    if (!zipCode) {
      newErrors.zipCode = "Preencha o CEP!";
    } else if (zipCode.length !== 9) {
      newErrors.zipCode = "CEP inválido!";
    }

    if (!number) {
      newErrors.number = "Preencha o número!";
    }

    return newErrors;
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.put(`users/${profile?.id}`, {
        email,
        mobile,
        document,
        zipCode,
        number,
        complement,
      });

      toast.success("Perfil atualizado com sucesso!\nRedirecionando...", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-toast",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`users/${profile?.id}`);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir a conta: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <BackButton
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Acesse para voltar"
          >
            <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
          </BackButton>
          <Col>
            <UserIcon width={30} strokeWidth={2} />
            <Text>Meus dados</Text>
          </Col>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!errors.email}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Label htmlFor="mobile">Telefone</Label>
          <StyledInputMask
            type="text"
            mask={"(99) 99999-9999"}
            maskChar={null}
            id="mobile"
            placeholder="Digite seu telefone"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            hasError={!!errors.mobile}
          />
          {errors.mobile && <ErrorText>{errors.mobile}</ErrorText>}
          <Label htmlFor="document">CPF/CNPJ</Label>
          <Input
            type="number"
            id="document"
            placeholder="CPF/CNPJ"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            hasError={!!errors.document}
          />
          {errors.document && <ErrorText>{errors.document}</ErrorText>}
          <Label htmlFor="zipCode">CEP</Label>
          <StyledInputMask
            type="text"
            mask={"99999-999"}
            maskChar={null}
            id="zipCode"
            placeholder="CEP"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            hasError={!!errors.zipCode}
          />
          {errors.zipCode && <ErrorText>{errors.zipCode}</ErrorText>}
          <Col2>
            <div>
              <Label htmlFor="number">Número</Label>
              <Input
                type="text"
                id="number"
                placeholder="Número"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                hasError={!!errors.number}
              />
            </div>
            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                type="text"
                id="complement"
                placeholder="Complemento"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                hasError={!!errors}
              />
            </div>
          </Col2>
          {errors.number && <ErrorText>{errors.number}</ErrorText>}
          <ColButton>
            <PrimaryButton type="button" onClick={handleUpdate}>
              Confirmar
            </PrimaryButton>
            <CancelButton type="button" onClick={handleDelete}>
              Excluir Conta
            </CancelButton>
          </ColButton>
          <ToastContainer autoClose={3000} className="custom-toast" />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MyData;
