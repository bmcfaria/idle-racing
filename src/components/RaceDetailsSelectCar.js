import React, { useContext, useState } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Button from './Button';
import { colors } from '../helpers/theme';
import { RaceContext } from '../helpers/context';
import { useRequirements } from '../helpers/hooks';

const SelectCarContainer = styled(Flex)`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const RaceDetailsSelectCar = ({ onClick, ...props }) => {
  const { requirements } = useContext(RaceContext);
  const { requirementText } = useRequirements();
  const [hover, setHover] = useState(false);

  return (
    <SelectCarContainer
      w="100%"
      h="100%"
      borderRadius="0 16px 16px 0"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      direction="column"
      alignItems="center"
      {...props}
    >
      <Flex
        w="100%"
        h="74px"
        color={colors.white}
        textAlign="center"
        fontSize="14px"
        direction="column"
        justifyContent="center"
      >
        {requirements.map((requirement, index) => (
          <Text key={index}>{requirementText(requirement)}</Text>
        ))}
      </Flex>
      <Button
        bg={colors.white}
        colors={colors.darkGray}
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
