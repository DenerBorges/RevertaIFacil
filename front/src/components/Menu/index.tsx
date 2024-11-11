import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { LuRecycle } from "react-icons/lu";

import { Container, IconWrapper, Label, MenuItem } from "./styles";

interface MenuProps {
  activePage: string;
}

const menuItems = [
  { name: "Home", icon: <HomeIcon strokeWidth={2} />, route: "/home" },
  { name: "Mapa", icon: <MapPinIcon strokeWidth={2} />, route: "/map" },
  {
    name: "Busca",
    icon: <MagnifyingGlassIcon strokeWidth={2} />,
    route: "/search",
  },
  {
    name: "Coletas",
    icon: <LuRecycle size={25} strokeWidth={2} />,
    route: "/collections",
  },
  {
    name: "Agenda",
    icon: <CalendarDaysIcon strokeWidth={2} />,
    route: "/agenda",
  },
];

const Menu: React.FC<MenuProps> = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          active={activePage === item.name}
          onClick={() => navigate(item.route)}
        >
          <IconWrapper active={activePage === item.name}>
            {item.icon}
          </IconWrapper>
          <Label active={activePage === item.name}>{item.name}</Label>
        </MenuItem>
      ))}
    </Container>
  );
};

export default Menu;
