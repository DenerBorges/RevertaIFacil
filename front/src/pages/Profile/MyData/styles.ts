import styled from "styled-components";
import InputMask from "react-input-mask";
import { COLORS } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  background-color: ${COLORS.secondary};
  padding: 5rem 2rem 0 2rem;
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

export const Label = styled.label`
  font-size: 18px;
`;

export const Input = styled.input<{ hasError: boolean }>`
  background-color: ${COLORS.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: solid 2px #f1f1f1;
  border-radius: 0.6rem;
  margin: 1rem 0;
  height: 2.5rem;
  font-size: 17px;
  padding: 1.2rem;
  padding-top: 1.4rem;
  width: 100%;
  -moz-appearance: textfield;

  &::placeholder {
    color: #adadad;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? COLORS.red : COLORS.primary)};
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const StyledInputMask = styled(InputMask)<{ hasError: boolean }>`
  background-color: ${COLORS.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: solid 2px #f1f1f1;
  border-radius: 0.6rem;
  margin: 1rem 0;
  height: 2.5rem;
  font-size: 17px;
  padding: 1.2rem;
  padding-top: 1.4rem;
  width: 100%;
  -moz-appearance: textfield;

  &::placeholder {
    color: #adadad;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? COLORS.red : COLORS.primary)};
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const ErrorText = styled.p`
  color: ${COLORS.red};
  font-size: 14px;
`;

export const Col2 = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 2.3rem;
  margin-top: 1rem;
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

  @media (max-width: 381px) {
    padding: 1rem 1.63rem;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.6rem;
  background-color: ${COLORS.red};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    background-color: ${COLORS.redDark};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 490px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 381px) {
    padding: 1rem 1rem;
  }
`;

export const ColButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;
