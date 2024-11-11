import styled from "styled-components";
import { COLORS } from "../../assets/colors";

export const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: ${COLORS.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #aaa;
  z-index: 1000;
`;

export const MenuItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? COLORS.primary : "#aaa")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-size: 0.8rem;

  & svg {
    color: ${(props) => (props.active ? COLORS.primary : "#aaa")};
    width: 24px;
    height: 24px;
  }
`;

export const IconWrapper = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? COLORS.primary : "#aaa")};
  width: 24px;
  height: 24px;
`;

export const Label = styled.span<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active }) => (active ? COLORS.primary : "#aaa")};
`;
