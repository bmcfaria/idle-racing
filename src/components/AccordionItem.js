import React from 'react';
import { Box } from '@chakra-ui/core';
import { CARD_MARGIN } from '../helpers/theme';

const AccordionItem = ({ children, ...props }) => (
  <Box
    marginRight={`${CARD_MARGIN}px`}
    marginBottom={`${CARD_MARGIN}px`}
    {...props}
  >
    {children}
  </Box>
);

export default AccordionItem;
