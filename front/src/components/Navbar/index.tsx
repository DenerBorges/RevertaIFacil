import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "../../types/user";
import api from "../../utils/api";

import { Container, Logo, ProfileImage } from "./styles";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent }) => {
  const [profile, setProfile] = useState<userType>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (isLoggedIn) {
        try {
          const response = await api.get("users/profile");
          setProfile(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProfile();
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  return (
    <Container transparent={transparent}>
      <Logo
        src={require("../../assets/images/logo192.png")}
        alt="Logo do App"
        onClick={() => navigate("/home")}
      />
      {!isBase64Image(profile?.profilePic) ? (
        <ProfileImage
          src={profile?.profilePic}
          alt="Foto de perfil"
          onClick={() => navigate("/profile")}
        />
      ) : (
        <ProfileImage
          src={`data:image/jpeg;base64,${profile?.profilePic}`}
          className="image-card d-block w-100"
          alt="Foto de perfil"
          onClick={() => navigate("/profile")}
        />
      )}
    </Container>
  );
};

export default Navbar;
