import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
// import RaceDetailsSelectedCarWinningChance from './RaceDetailsSelectedCarWinningChance';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES, doMeetRequirements } from '../helpers/utils';
import { ReactComponent as ChangeIcon } from '../assets/icons/change.svg';
import Button from './Button';
import styled from '@emotion/styled';
import getImageCar from '../helpers/imageMappingCars';
import CardWinningChance from './CardWinningChance';

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: contain;
  margin: auto;
`;

const RaceDetailsSelectedCar = ({ car, track, carsModalOpen, ...props }) => {
  const meetsRequirements = doMeetRequirements(car, track.requirements);

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      alignItems="center"
      padding="16px 16px 0"
      {...props}
    >
      <Button
        w="100%"
        h="auto"
        padding="8px"
        border={`1px solid ${colors.white}`}
        bg={colors.white}
        color={colors.darkGray}
        _hover={{
          boxShadow: 'none',
          borderColor: colors.blue,
          svg: {
            color: colors.blue,
          },
        }}
        onClick={carsModalOpen}
      >
        <Flex
          w="100%"
          // h="100%"
          direction="column"
          justifyContent="space-evenly"
        >
          <Flex>
            <Text
              textAlign="left"
              fontSize="16px"
              lineHeight="16px"
              flexGrow="1"
            >
              {car.name}
            </Text>
            <Box w="14px" h="14px" as={ChangeIcon} />
          </Flex>
          <Flex position="relative">
            <Box w="56px" position="absolute" bottom="-12px" left="0">
              <Image alt="car" src={getImageCar(car)} />
            </Box>
            <Flex
              direction="column"
              flexGrow="1"
              fontSize="14px"
              lineHeight="14px"
            >
              <Text textAlign="right" fontSize="12px">
                ACC: {car[ATTRIBUTE_TYPES.ACCELERATION].value}
              </Text>
              <Text textAlign="right" fontSize="12px">
                SPD: {car[ATTRIBUTE_TYPES.SPEED].value}
              </Text>
              <Text textAlign="right" fontSize="12px">
                HND: {car[ATTRIBUTE_TYPES.HANDLING].value}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Button>
      <CardWinningChance
        car={car}
        track={track}
        meetsRequirements={meetsRequirements}
        borderRadius="0 0 4px 4px"
        marginTop="-4px"
        paddingTop="4px"
      />
      {/* <RaceDetailsSelectedCarWinningChance car={car} track={track} w="100%" /> */}
    </Flex>
  );
};

export default RaceDetailsSelectedCar;
