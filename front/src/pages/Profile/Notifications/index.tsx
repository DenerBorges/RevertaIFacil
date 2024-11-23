import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import { BackButton, Col, Container, ContentWrapper, Link, SubText, Text } from "./styles";

const Notifications: React.FC = () => {
  const navigate = useNavigate();

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
            <BellIcon width={30} strokeWidth={2} />
            <Text>Meus dados</Text>
          </Col>
          <SubText>Permitir que o app envie notificações como:</SubText>
          <Col>
            <Link href="#">
              <CheckCircleIcon width={25} />
              Lembretes para coletas agendadas
            </Link>
          </Col>
          <Col>
            <Link href="#">
              <CheckCircleIcon width={25} />
              Lembretes para coletas em EcoPontos
            </Link>
          </Col>
          <Col>
            <Link href="#">
              <CheckCircleIcon width={25} />
              Alterações e/ou atualizações da plataforma
            </Link>
          </Col>
          <Col>
            <Link href="#">
              <CheckCircleIcon width={25} />
              Avisos gerais
            </Link>
          </Col>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Notifications;
