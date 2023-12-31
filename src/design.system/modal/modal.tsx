import React, { useCallback, useEffect, useRef } from 'react';
import PortalModal from './portal.modal';
import * as S from './modal.styled';
import { Props } from './types';
import { Text } from '../text/text';
import theme from '@/styles/palette';
import { useOnClickOutside } from '@/hooks';
import CloseIcon from '@/assets/icons/close-modal.svg';
import { Button } from '../button/button';
export function Modal({ children, closeModal, config }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // handle what happens on click outside of modal
  const handleClickOutside = () => closeModal();

  // handle what happens on key press
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  }, []);

  useOnClickOutside(modalRef, handleClickOutside);

  useEffect(() => {
    // attach the event listener if the modal is shown
    document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <PortalModal wrapperId="modal-portal">
        <S.Overlay
          showOverlay={config.showOverlay}
          positionX={config.positionX}
          positionY={config.positionY}
          style={{
            animationDuration: '400ms',
            animationDelay: '0',
          }}
        >
          <S.ModalContainer padding={config.padding} ref={modalRef}>
            {config.showHeader && (
              <S.ModalHeader>
                <Text size={24} weight={700}>
                  {config.title}
                </Text>
              </S.ModalHeader>
            )}

            <S.Close onClick={closeModal}>
              <CloseIcon />
            </S.Close>

            <S.Content>{children}</S.Content>
            {config?.footer && (
              <S.ModalFooter>
                <Button
                  disabled={config.footer.isDisabled}
                  style={{ width: 'fir-content' }}
                  onClick={config.footer.primaryBtnAction}
                >
                  <Text size={16} weight={700} color={theme.text.dark_button}>
                    {config.footer.primaryBtnText}
                  </Text>
                </Button>
              </S.ModalFooter>
            )}
          </S.ModalContainer>
        </S.Overlay>
      </PortalModal>
    </>
  );
}
