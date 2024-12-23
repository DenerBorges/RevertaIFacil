import styled from "styled-components";
import { COLORS } from "../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.secondary};
  padding: 1rem;
  padding-bottom: 7rem;
  max-width: 100vw;
  margin: 0 auto;
`;

export const Image = styled.img`
  margin: 5rem 0.5rem;
  padding: 0 1rem;
  width: 100%;
  max-width: 600px;
  height: auto;
`;

export const PrimaryButton = styled.button`
  display: inline-block;
  padding: 1rem 4rem;
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

export const SecondaryButton = styled.button`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  border: 4px solid ${COLORS.primary};
  border-radius: 0.6rem;
  background-color: transparent;
  color: ${COLORS.primary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 90%;

  &:hover {
    background-color: rgba(0, 100, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;
