import React from "react";
import { styled } from "styled-components";
import { Text } from "../text/text";
import theme from "@/styles/palette";

const DangerZoneWrapper = styled.div`
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue_grey}`};
  border-radius: 8px;
  width: fit-content;
  width: 344px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DangerButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  :hover {
    background: ${({ theme }) => theme.colors.error};
    p {
      color: #fff !important;
    }
  }
`;

const DangerButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: transparent;
  border: ${({ theme }) => `1px solid ${theme.colors.blue_grey}`};
  cursor: pointer !important;
`;

interface DangerZoneProps {
  title: string;
  subTitle: string;
  btnText: string;
  onClick: () => void;
}

export function DangerZone({
  title,
  subTitle,
  btnText,
  onClick,
}: DangerZoneProps) {
  return (
    <>
      <DangerZoneWrapper>
        <Text size={14} weight={600}>
          {title}
        </Text>
        <Text size={12}>{subTitle}</Text>
        <DangerButtonWrapper>
          <DangerButton onClick={onClick}>
            <Text weight={500} size={14} color={theme.colors.error}>
              {btnText}
            </Text>
          </DangerButton>
        </DangerButtonWrapper>
      </DangerZoneWrapper>
    </>
  );
}
