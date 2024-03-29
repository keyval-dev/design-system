import React, { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Text } from '@/design.system';
import { LANGUAGES_LOGOS } from '@/assets';
import { Handle, Position } from 'reactflow';

const NamespaceContainer = styled.div`
  display: flex;
  padding: 16px;
  border-radius: 12px;
  border: ${({ theme }) => `solid 1px ${theme.colors.blue_grey}`};
  background: ${({ theme }) => theme.colors.dark};
  align-items: center;
  width: 272px;
  gap: 8px;
`;

const TextWrapper = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  padding: 4px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface NamespaceNodeProps {
  data: {
    namespace?: string;
    name?: string;
    languages?: { language: keyof typeof LANGUAGES_LOGOS }[];
  };
  isConnectable: boolean;
}

export default memo(({ data, isConnectable }: NamespaceNodeProps) => {
  const languageKey = data?.languages?.[0]?.language || 'default';
  const lan = LANGUAGES_LOGOS[languageKey];

  return (
    <NamespaceContainer>
      <ImageWrapper>
        <img src={lan} alt={''} width={32} height={32} />
      </ImageWrapper>
      <TextWrapper>
        <Text color={'#8b92a5'}>{data.namespace}</Text>
        <Text size={18} weight={600}>
          {data?.name}
        </Text>
      </TextWrapper>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
        style={{ visibility: 'hidden' }}
      />
    </NamespaceContainer>
  );
});
