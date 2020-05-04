import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { cardsContainerWidthPaddingStyles } from '../helpers/theme';

const CarsContainer = styled(Flex)`
  max-height: ${({ open }) => (open ? '50vh' : 0)};
  overflow-y: auto;
  box-sizing: content-box;
  transition: max-height 0.5s;

  ${cardsContainerWidthPaddingStyles}
`;

const Accordion = ({
  name,
  cars = [],
  value,
  selectedAccordion,
  setSelectedAccordion,
  children,
  ...props
}) => {
  const toggleOpen = () => {
    if (selectedAccordion === value) {
      setSelectedAccordion();
    } else {
      setSelectedAccordion(value);
    }
  };

  return (
    <Box bg="white" borderRadius="16px" {...props}>
      <Flex w="100%" h="48px" onClick={toggleOpen}>
        <Text margin="auto" fontSize="xl">
          {name}
        </Text>
      </Flex>
      <CarsContainer
        wrap="wrap"
        open={selectedAccordion === value}
        overflow="hidden"
      >
        {children}
      </CarsContainer>
    </Box>
  );
};

export default Accordion;
