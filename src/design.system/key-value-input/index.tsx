import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/palette';
import { Tooltip } from '../tooltip';
import { Text } from '../text/text';
import { Trash } from '@/assets/icons';

export interface KeyValue {
  id: number;
  key: string;
  value: string;
}

export const Container = styled.div`
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Table = styled.table`
  border: solid 1px ${theme.text.grey};
  text-align: center;
  border-spacing: 0;
  border-radius: 8px;
  width: 100%;
`;

export const Th = styled.th`
  padding: 4px;
`;

export const Td = styled.td<{ right?: boolean; left?: boolean }>`
  padding: 8px 0;

  border-top: solid 1px ${theme.text.grey};
  border-right: ${({ right }) =>
    right ? `solid 1px ${theme.text.grey}` : 'none'};
  border-left: ${({ left }) =>
    left ? `solid 1px ${theme.text.grey}` : 'none'};
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  width: 94%;

  outline: none;
  color: ${theme.text.white};
`;

export const AddRowButton = styled.td`
  text-align: center;
  border-top: solid 1px ${theme.text.grey};
  padding: 4px;
  cursor: pointer;
`;

export interface KeyValueTableProps {
  keyValues: KeyValue[];
  setKeyValues: (keyValues: KeyValue[]) => void;
  title?: string;
  titleKey?: string;
  titleValue?: string;
  tooltip?: string;
  titleButton?: string;
  required?: boolean;
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({
  keyValues,
  setKeyValues,
  title,
  titleKey,
  titleValue,
  titleButton,
  tooltip,
  required,
}: KeyValueTableProps) => {
  const [nextId, setNextId] = useState(1);

  const addRow = () => {
    const newKeyValue: KeyValue = {
      id: nextId,
      key: '',
      value: '',
    };
    setKeyValues([...keyValues, newKeyValue]);
    setNextId(nextId + 1);
  };

  const deleteRow = (id: number) => {
    const value = keyValues.filter((kv) => kv.id !== id);
    setKeyValues(value);
  };

  const updateKey = (id: number, newKey: string) => {
    const updatedKeyValues = keyValues.map((kv) =>
      kv.id === id ? { ...kv, key: newKey } : kv
    );
    setKeyValues(updatedKeyValues);
  };

  const updateValue = (id: number, newValue: string) => {
    const updatedKeyValues = keyValues.map((kv) =>
      kv.id === id ? { ...kv, value: newValue } : kv
    );
    setKeyValues(updatedKeyValues);
  };

  return (
    <Container>
      {title && (
        <TitleWrapper>
          <Tooltip text={tooltip || ''}>
            <div style={{ display: 'flex', gap: 4 }}>
              <Text size={14} weight={600}>
                {title}
              </Text>
              {required && (
                <Text size={14} weight={600}>
                  {'*'}
                </Text>
              )}
            </div>
          </Tooltip>
        </TitleWrapper>
      )}
      <Table>
        <thead>
          <tr>
            <Th>
              <Text
                color={theme.text.grey}
                size={14}
                style={{ display: 'flex' }}
                weight={300}
              >
                {titleKey || 'Key'}
              </Text>
            </Th>
            <Th>
              <Text
                color={theme.text.grey}
                size={14}
                style={{ display: 'flex' }}
                weight={300}
              >
                {titleValue || 'Value'}
              </Text>
            </Th>
          </tr>
        </thead>
        <tbody>
          {keyValues.map((kv) => (
            <tr key={kv.id}>
              <Td right>
                <Input
                  type="text"
                  value={kv.key}
                  onChange={(e) => updateKey(kv.id, e.target.value)}
                />
              </Td>

              <Td>
                <Input
                  type="text"
                  value={kv.value}
                  onChange={(e) => updateValue(kv.id, e.target.value)}
                />
              </Td>
              <Td
                style={{ cursor: 'pointer' }}
                left
                onClick={() => deleteRow(kv.id)}
              >
                <Trash />
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <AddRowButton onClick={addRow} colSpan={3}>
              <Text weight={400} size={14} color={theme.colors.torquiz_light}>
                {titleButton || 'Add Row'}
              </Text>
            </AddRowButton>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};
