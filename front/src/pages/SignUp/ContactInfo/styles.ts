import styled from "styled-components";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  background-color: ${COLORS.secondary};
  padding: 1.5rem 2rem 10rem 2rem;
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
  white-space: pre-line;
`;

export const Input = styled.input`
  background-color: ${COLORS.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: solid 2px #f1f1f1;
  border-radius: 0.6rem;
  margin-top: 1.5rem;
  height: 3.5rem;
  font-size: 17px;
  padding: 1.2rem;
  padding-top: 1.4rem;
  width: 100%;
  -moz-appearance: textfield;

  &::placeholder {
    color: #adadad;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const Link = styled.a`
  display: flex;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  color: ${COLORS.black};
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 4rem;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  border: none;
  border-radius: 0.6rem;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    background-color: ${COLORS.primaryDark};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

export const Col = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Col2 = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1.5rem;
`;
