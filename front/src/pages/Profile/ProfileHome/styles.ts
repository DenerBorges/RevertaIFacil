import styled from "styled-components";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  background-color: ${COLORS.secondary};
  padding: 8rem 2rem 7rem 2rem;
  max-width: 100vw;
  margin: 0 auto;
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

export const MainText = styled.p`
  text-align: start;
  font-size: 26px;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 3rem;
  white-space: pre-line;
`;

export const Link = styled.a`
  display: flex;
  color: ${COLORS.black};
  text-decoration: underline 0.15em rgba(255, 255, 255, 0);
  transition: text-decoration 300ms;

  &:hover,
  :focus {
    text-decoration-color: ${COLORS.black};
  }
`;

export const Text = styled.p`
  margin-left: 1rem;
  font-size: 22px;
`;

export const HR = styled.hr`
  margin: 1.5rem 0;
`;
