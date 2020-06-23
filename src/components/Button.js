import React from 'react';
import { Button as ButtonChakra } from '@chakra-ui/core';
import { colors } from '../helpers/theme';

const Button = ({ children, ...props }) => (
  <ButtonChakra
    h="32px"
    fontSize="14px"
    fontWeight="inherit"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    _focus={{
      boxShadow: `0 0 0 3px ${colors.blue}`,
    }}
    _hover={{
      boxShadow: 'none',
    }}
    _active={{
      borderColor: 'transparent',
    }}
    style={{
      WebkitTapHighlightColor: 'transparent',
    }}
    {...props}
  >
    {children}
  </ButtonChakra>
);

export default Button;
