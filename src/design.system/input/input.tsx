import React, { ChangeEvent, useState } from 'react';
import {
  StyledInputContainer,
  StyledInput,
  ErrorWrapper,
  LabelWrapper,
  DisplayIconsWrapper,
} from './input.styled';
import { Text } from '../text/text';
import EyeOpenIcon from '@/assets/icons/eye-open.svg';
import EyeCloseIcon from '@/assets/icons/eye-close.svg';
import { Tooltip } from '../tooltip';
import theme from '@/styles/palette';
interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tooltip?: string;
  required?: boolean;
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  error = '',
  style = {},
  placeholder,
  onKeyDown,
  tooltip,
  required,
}: InputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div style={{ ...style }}>
      {label && (
        <LabelWrapper>
          <Tooltip text={tooltip || ''}>
            <div style={{ display: 'flex', gap: 4 }}>
              <Text size={14} weight={600}>
                {label}
              </Text>
              {required && (
                <Text size={14} weight={600}>
                  {'*'}
                </Text>
              )}
            </div>
          </Tooltip>
        </LabelWrapper>
      )}
      <StyledInputContainer
        active={!!value || undefined}
        error={error ? true : undefined}
      >
        <StyledInput
          type={showPassword ? 'text' : type}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        {type === 'password' && (
          <DisplayIconsWrapper onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <EyeOpenIcon width={16} height={16} />
            ) : (
              <EyeCloseIcon width={16} height={16} />
            )}
          </DisplayIconsWrapper>
        )}
      </StyledInputContainer>
      {error && (
        <ErrorWrapper>
          <Text size={14} color={'#FD3F3F'}>
            {error}
          </Text>
        </ErrorWrapper>
      )}
    </div>
  );
}
