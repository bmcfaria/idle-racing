import React, { useContext, useState } from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Button from './Button';
import { colors } from '../helpers/theme';
import { RaceContext } from '../helpers/context';
import { useRequirements } from '../helpers/hooks';
import { useSelector } from 'react-redux';
import { dealerCarsSelector } from '../state/selectors';
import getImageCar from '../helpers/imageMappingCars';

const SelectCarContainer = styled(Flex)`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const RaceDetailsSelectCar = ({ onClick, ...props }) => {
  const { requirements, prizes } = useContext(RaceContext);
  const dealerCars = useSelector(dealerCarsSelector);
  const { requirementText } = useRequirements();
  const [hover, setHover] = useState(false);

  const rewardCar =
    isNaN(prizes[0]) && dealerCars.find(({ id }) => id === prizes[0]);

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
      {rewardCar && (
        <Flex w="144px" h="40px" marginTop="auto" marginBottom="20px">
          <Flex
            flexGrow="1"
            h="100%"
            borderRadius="8px 0 0 8px"
            bg={colors.green}
            direction="column"
            fontSize="14px"
            paddingLeft="12px"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            <Text color={colors.darkGray}>1st Prize</Text>
            <Text>{rewardCar.name}</Text>
          </Flex>
          <Flex w="52px" h="100%" borderRadius="0 8px 8px 0" bg={colors.white}>
            <Image
              w="100%"
              h="100%"
              alt="car"
              margin="auto"
              borderRadius="16px"
              objectFit="contain"
              src={getImageCar(rewardCar)}
            />
          </Flex>
        </Flex>
      )}
    </SelectCarContainer>
  );
};

export default RaceDetailsSelectCar;
