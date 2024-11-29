import styled from "styled-components";
import { COLORS } from "../../assets/colors";

export const Container = styled.div<{ transparent?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 2.2rem;
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : COLORS.white};
  position: fixed;
  top: 0;
  z-index: 1000;

  box-shadow: ${({ transparent }) =>
    transparent ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
`;

export const Logo = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

export const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
