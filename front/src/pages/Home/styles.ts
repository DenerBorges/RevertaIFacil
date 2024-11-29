import styled from "styled-components";
import { COLORS } from "../../assets/colors";

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

export const MainText = styled.p`
  text-align: start;
  font-size: 26px;
  font-weight: 600;
  margin-top: 4rem;
  margin-bottom: 1rem;
  white-space: pre-line;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
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

export const Link = styled.a`
  font-weight: bold;
  color: ${COLORS.primary};
  text-decoration: none;
`;

export const Text = styled.p`
  text-align: start;
  font-size: 22px;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem 0;
  white-space: pre-line;
`;

export const SecondaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 1rem 4rem;
  margin-bottom: 2rem;
  border: 3px solid ${COLORS.primary};
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
