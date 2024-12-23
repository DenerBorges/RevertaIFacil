import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, InformationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
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
  Info,
  Input,
  Label,
  ModalButton,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  ProfileImage,
  StyledInputMask,
  Text,
} from "./styles";

const MyData: React.FC = () => {
  const [profile, setProfile] = useState<userType>();
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [document, setDocument] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [temporaryProfilePic, setTemporaryProfilePic] = useState(profilePic);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      setProfilePic(response.data.profilePic);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setDocument(response.data.document);
      setZipCode(response.data.zipCode);
      setNumber(response.data.number);
      setComplement(response.data.complement);

      if (response.data.email.includes("@gmail.com")) {
        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setTemporaryProfilePic(URL.createObjectURL(file));
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) {
      newErrors.firstName = "Preencha o campo de primeiro nome!";
    }

    if (!lastName) {
      newErrors.lastName = "Preencha o campo de último nome!";
    }

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

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("document", document);
    formData.append("zipCode", zipCode);
    formData.append("number", number);
    formData.append("complement", complement);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await api.put(`users/${profile?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Perfil atualizado com sucesso!\nRedirecionando...", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-toast",
      });

      setTimeout(() => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
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

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

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
          {isDisabled && (
            <Info>
              <InformationCircleIcon />
              Não é possível modificar seu email Google!
            </Info>
          )}
          <Col>
            <UserIcon width={30} strokeWidth={2} />
            <Col2>
              <Text>Meus dados</Text>
              {!isBase64Image(profilePic) ? (
                <ProfileImage
                  src={temporaryProfilePic || profilePic}
                  alt="Foto de perfil"
                  onClick={handleOpenModal}
                />
              ) : (
                <ProfileImage
                  src={
                    temporaryProfilePic ||
                    `data:image/jpeg;base64,${profilePic}`
                  }
                  className="image-card d-block w-100"
                  alt="Foto de perfil"
                  onClick={handleOpenModal}
                />
              )}
            </Col2>
          </Col>
          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <ModalTitle>Mudar foto de perfil</ModalTitle>
                <input
                  type="file"
                  placeholder="arquivo"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {temporaryProfilePic && (
                  <img
                    src={temporaryProfilePic}
                    alt="Pré-visualização da nova foto"
                    style={{
                      marginTop: "16px",
                      borderRadius: "50%",
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Col2>
                  <ModalButton onClick={handleConfirmModal}>
                    Confirmar
                  </ModalButton>
                  <ModalCloseButton onClick={handleCloseModal}>
                    Cancelar
                  </ModalCloseButton>
                </Col2>
              </ModalContent>
            </ModalOverlay>
          )}
          <Col2>
            <div>
              <Label htmlFor="firstName">Primeiro Nome</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Primeiro nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                hasError={!!errors.firstName}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Último Nome</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Último nome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                hasError={!!errors.lastName}
              />
            </div>
          </Col2>
          {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}
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
