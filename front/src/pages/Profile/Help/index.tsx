import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import {
  BackButton,
  Col,
  Container,
  ContentWrapper,
  FAQItem,
  FAQText,
  SubText,
  Text,
} from "./styles";

const Help: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Como faço para descartar meus pneus?",
      answer: "Leve a um ponto de coleta ou solicite a retirada.",
    },
    {
      question: "Quais tipos de pneus são aceitos?",
      answer: "Pneus de carros, motos e bicicletas são aceitos.",
    },
    {
      question: "Preciso pagar para reciclar pneus?",
      answer: "Depende da empresa coletora ou política local.",
    },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <ContentWrapper>
          <BackButton
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Acesse para voltar"
          >
            <ChevronLeftIcon width={20} strokeWidth={3} color="#319E42" />
          </BackButton>
          <Col>
            <QuestionMarkCircleIcon width={30} strokeWidth={2} />
            <Text>Ajuda</Text>
          </Col>
          <SubText>Perguntas frequentes:</SubText>
          {faqs.map((faq, index) => (
            <FAQItemComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </ContentWrapper>
      </Container>
    </>
  );
};

const FAQItemComponent: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => setIsOpen(!isOpen);

  return (
    <FAQItem onClick={toggleFAQ}>
      <FAQText>
        {question}
        {isOpen ? (
          <ChevronUpIcon width={20} strokeWidth={2} />
        ) : (
          <ChevronDownIcon width={20} strokeWidth={2} />
        )}
      </FAQText>
      {isOpen && <p>{answer}</p>}
    </FAQItem>
  );
};

export default Help;
