import { useState } from "react";
import styled from "styled-components";

type AccordionItemProps = {
    title: string,
    content: string
}

type AccordionProps = {
    termsData: AccordionItemProps[]
}

const AccordionItem = styled.div`
  border-bottom: 1px solid #ffffff;
`;

const AccordionHeader = styled.div`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: #232323;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;

const AccordionContentWrapper = styled.div`
  color: #232323;
  padding: 15px;
`;

export default function Accordion(props: AccordionProps) {
  const [openedId, setOpenedId] = useState<number | null>(null);

  function handleAccordionToggle(id: number) {
    setOpenedId(openedId === id ? null : id);
  }

  return (
    <>
      {props.termsData.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => handleAccordionToggle(index)}>
            <div>{item.title}</div>
            <span>{openedId === index ? "-" : "+"}</span>
          </AccordionHeader>
          <AccordionContent isOpen={openedId === index}>
            <AccordionContentWrapper>{item.content}</AccordionContentWrapper>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}