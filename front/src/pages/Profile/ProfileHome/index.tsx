import React from "react";
import Navbar from "../../../components/Navbar";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Container, ContentWrapper, HR, Link, MainText, Text } from "./styles";

const Profile: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <MainText>Nome da pessoa</MainText>
          <Link href="/mydata" aria-label="Meus dados">
            <UserIcon width={30} strokeWidth={2} />
            <Text>Meus dados</Text>
          </Link>
          <HR />
          <Link href="/notifications" aria-label="Notificações">
            <BellIcon width={30} strokeWidth={2} />
            <Text>Notificações</Text>
          </Link>
          <HR />
          <Link href="/help" aria-label="Ajuda">
            <QuestionMarkCircleIcon width={30} strokeWidth={2} />
            <Text>Ajuda</Text>
          </Link>
          <HR />
          <Link href="/" aria-label="Sair" onClick={handleLogout}>
            <ArrowRightStartOnRectangleIcon width={30} strokeWidth={2} />
            <Text>Sair</Text>
          </Link>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Profile;
