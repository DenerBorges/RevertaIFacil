import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import api from "../../utils/api";
import { userType } from "../../types/user";
import { useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { LuRecycle } from "react-icons/lu";

import {
  Card,
  Container,
  ContentWrapper,
  Grid,
  Link,
  MainText,
  PrimaryButton,
  SecondaryButton,
  Text,
} from "./styles";

const Home: React.FC = () => {
  const [profile, setProfile] = useState<userType>();

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>{"Olá, " + profile?.firstName}</MainText>
          <Card>
            <p>Acesse o seu histórico de coleta</p>
            <PrimaryButton
              type="button"
              onClick={() => navigate("/collections")}
            >
              Acessar
            </PrimaryButton>
          </Card>
          <Grid>
            <Link href="/map" aria-label="Mapa">
              <Card>
                <MapPinIcon strokeWidth={1.5} width={35} />
                <p>Veja pontos de coleta</p>
              </Card>
            </Link>
            <Link href="/search" aria-label="Busca">
              <Card>
                <MagnifyingGlassIcon strokeWidth={1.5} width={35} />
                <p>Coletas em andamento</p>
              </Card>
            </Link>
            <Link href="/collections" aria-label="Coletas">
              <Card>
                <LuRecycle strokeWidth={1.5} size={35} />
                <p>Histórico de coletas</p>
              </Card>
            </Link>
            <Link href="/agenda" aria-label="Agenda">
              <Card>
                <CalendarDaysIcon strokeWidth={1.5} width={35} />
                <p>Coletas agendadas</p>
              </Card>
            </Link>
          </Grid>
          <Text>Registrar uma coleta de materias</Text>
          <SecondaryButton type="button" onClick={() => navigate("/map")}>
            Registrar
          </SecondaryButton>
        </ContentWrapper>
        <Menu activePage="Home" />
      </Container>
    </>
  );
};

export default Home;
