import React, { useState, useRef } from 'react';
import { Flex, Button } from '@chakra-ui/core';
import styled from '@emotion/styled';

const SelectCarContainer = styled(Flex)`
  cursor: pointer;
`;

const RaceDetailsSelectCar = ({ onClick, ...props }) => {
  const buttonRef = useRef();
  const [hover, setHover] = useState(false);

  return (
    <SelectCarContainer
      w="100%"
      h="100%"
      bg="grey"
      borderRadius="0 16px 16px 0"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <Button ref={buttonRef} variant="outline" margin="auto" isActive={hover}>
        Select car
      </Button>
    </SelectCarContainer>
  );
};

export default RaceDetailsSelectCar;
