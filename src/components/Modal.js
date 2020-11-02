import React from 'react';
import { Box } from '@chakra-ui/core';
import { zIndex } from '../helpers/theme';
import { useHistoryHelper } from '../helpers/hooks';

const Modal = ({
  children,
  isOpen,
  onClose,
  backOnClose,
  wrapperProps = {},
  ...props
}) => {
  const history = useHistoryHelper();

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
          paddingTop={`${48 + 40 + 32}px`}
          paddingBottom="80px"
          bg="#000000c0"
          display="flex"
          zIndex={zIndex.modalBackground}
          onClick={onCloseClick}
          overflowY="auto"
          {...props}
        >
          <Box
            margin="auto"
            paddingLeft="calc(100vw - 100%)"
            onClick={onClickChild}
            {...wrapperProps}
          >
            {children}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Modal;
