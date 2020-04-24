import React from 'react';
import { Button as ButtonChakra } from '@chakra-ui/core';

const variantColors = {
  primary: 'teal',
  secondary: 'tomato',
};

const Button = ({ children, secondary, ...props }) => (
  <ButtonChakra
    variantColor={secondary ? variantColors.secondary : variantColors.primary}
    borderColor={secondary ? variantColors.secondary : variantColors.primary}
    color={secondary ? variantColors.secondary : variantColors.primary}
    variant="outline"
    h="32px"
    {...props}
  >
    {children}
  </ButtonChakra>
);

export default Button;
