import React, { useState } from 'react';
import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Button from './Button';
import { colors } from '../helpers/theme';

const SelectCarContainer = styled(Flex)`
  cursor: pointer;
`;

const RaceDetailsSelectCar = ({ onClick, ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <SelectCarContainer
      w="100%"
      h="100%"
      borderRadius="0 16px 16px 0"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <Button
        bg={colors.white}
        colors={colors.darkGray}
        margin="auto"
        _active={{
          boxShadow: 'none',
          border: `4px solid ${colors.purple}`,
        }}
        isActive={hover}
      >
        Select car
      </Button>
    </SelectCarContainer>
  );
};

export default RaceDetailsSelectCar;
