import styled from "styled-components";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  background-color: ${COLORS.secondary};
  padding: 1.5rem 2rem 3rem 2rem;
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
  white-space: pre-line;
`;

export const SecondaryText = styled.p`
  text-align: start;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2rem;
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

export const Line = styled.hr`
  background-color: ${COLORS.white};
  border: none;
  margin: 0.7rem 0 0 0;
  height: 0.3rem;
  width: 25%;

  @media (min-width: 768px) {
    width: 35%;
  }

  @media (min-width: 1024px) {
    width: 37%;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const RadioContainer = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 60%;

  @media (min-width: 768px) {
    width: 40%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }

  input[type="radio"] {
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #ccc;
    transition: all 0.3s ease;
    cursor: pointer;

    &:checked {
      background-color: #319e42;
    }
  }
`;

export const Input = styled.input`
  background-color: ${COLORS.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: solid 1px #f1f1f1;
  margin: 1rem 0.5rem 1rem 1rem;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
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
  margin-top: 2.5rem;
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

export const SocialButton = styled.button`
  flex: 50%;
  padding: 10px;
  align-self: center;
  padding: 1rem 3rem 0.63rem 3rem;
  margin: 1.3rem 0;
  border: none;
  border-radius: 0.6rem;
  background-color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    background-color: rgba(230, 230, 230);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

export const GoogleButtonWrapper = styled.div`
  display: flex;
  flex: 50%;
  justify-content: center;
  padding-top: 10px;
  margin: 1.3rem 0;
  border: none;
  border-radius: 0.6rem;
  background-color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    .nsm7Bb-HzV7m-LgbsSe {
      background-color: rgba(230, 230, 230);
    }
    background-color: rgba(230, 230, 230);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }

  .nsm7Bb-HzV7m-LgbsSe.Bz112c-LgbsSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
    padding: 0;
    margin: 0 0 10px 5px;
    width: 30px;
  }

  .nsm7Bb-HzV7m-LgbsSe {
    border: none;
  }
`;

export const Col = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Col2 = styled.div`
  display: flex;
  justify-content: center;
`;

export const Space = styled.div`
  margin-top: 4rem;
`;
