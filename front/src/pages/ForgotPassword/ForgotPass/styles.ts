import styled from "styled-components";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  background-color: ${COLORS.secondary};
  padding: 5rem 2rem 7rem 2rem;
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

export const MainText = styled.p`
  text-align: start;
  font-size: 26px;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const SecondaryText = styled.p`
  text-align: start;
  font-size: 15px;
  font-weight: 500;
  white-space: pre-line;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  padding: 0 0.5rem;
`;

export const Link = styled.a`
  display: block;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: ${COLORS.primary};
  text-decoration: underline 0.15em rgba(255, 255, 255, 0);
  transition: text-decoration 300ms;

  &:hover,
  :focus {
    text-decoration-color: ${COLORS.primary};
  }
`;

export const Input = styled.input<{ hasError: boolean }>`
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

  &::placeholder {
    color: #adadad;
  }
`;

export const ErrorText = styled.p`
  color: ${COLORS.red};
  font-size: 14px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const PrimaryButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 2rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  border: none;
  border-radius: 0.6rem;
  background-color: ${(props) => (props.disabled ? "gray" : COLORS.primary)};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    background-color: ${(props) => (props.disabled ? "gray" : COLORS.primaryDark)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

export const Space = styled.div`
  margin-top: 20rem;
`;
