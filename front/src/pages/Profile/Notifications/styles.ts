import styled from "styled-components";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  background-color: ${COLORS.secondary};
  padding: 10rem 2rem 0 2rem;
  max-width: 100vw;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 600px;
  }

  @media (min-width: 1024px) {
    max-width: 700px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

export const Col = styled.div`
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

export const Text = styled.p`
  margin-left: 1rem;
  font-size: 22px;
`;

export const SubText = styled.p`
  margin: 2rem 0;
  font-size: 18px;
`;

export const Link = styled.a`
  display: flex;
  text-align: start;
  font-size: 18px;
  text-decoration: none;
  color: ${COLORS.black};
`;
