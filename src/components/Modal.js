import React from 'react';
import { Box } from '@chakra-ui/core';
import { zIndex } from '../helpers/theme';
import { useHistory } from 'react-router-dom';

const Modal = ({ children, isOpen, onClose, backOnClose, ...props }) => {
  const history = useHistory();

  const onCloseClick = () => {
    if (backOnClose) {
      history.goBack();
    } else {
      onClose();
    }
  };

  const onClickChild = e => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <Box
          top="0"
          left="0"
          width="100%"
          height="100%"
          position="fixed"
          bg="#00000080"
          display="flex"
          zIndex={zIndex.modalBackground}
          onClick={onCloseClick}
          {...props}
        >
          <Box margin="auto" onClick={onClickChild}>
            {children}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Modal;
