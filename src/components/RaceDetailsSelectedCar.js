import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
// import RaceDetailsSelectedCarWinningChance from './RaceDetailsSelectedCarWinningChance';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES, doMeetRequirements } from '../helpers/utils';
import { ReactComponent as ChangeIcon } from '../assets/icons/change.svg';
import Button from './Button';
import CardWinningChance from './CardWinningChance';
import CarImage from './CarImage';

const Attribute = ({ text, value, ...props }) => (
  <Flex fontSize="14px" lineHeight="14px" justifyContent="flex-end" {...props}>
    <Text>{text}:</Text>
    <Text w="16px" textAlign="right">
      {value}
    </Text>
  </Flex>
);

const RaceDetailsSelectedCar = ({ car, track, carsModalOpen, ...props }) => {
  const meetsRequirements = doMeetRequirements(car, track.requirements);

  return (
    <Flex
      w="100%"
      h="100%"
      minH="112px"
      direction="column"
      alignItems="center"
      padding="16px 16px 0"
      {...props}
    >
      <Button
        w="100%"
        minH="76px"
        padding="8px 8px 4px 8px"
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
        <Flex w="100%" direction="column" justifyContent="space-evenly">
          <Flex>
            <Text
              textAlign="left"
              fontSize="16px"
              lineHeight="16px"
              flexGrow="1"
              zIndex="1"
              background={`linear-gradient(180deg, ${colors.white}, ${colors.white} 50%, ${colors.white}00)`}
            >
              {car.name}
            </Text>
            <Box w="14px" h="14px" as={ChangeIcon} />
          </Flex>
          <Flex position="relative" marginTop="4px">
            <Box w="72px" position="absolute" bottom="-12px" left="0">
              <CarImage margin="auto" car={car} />
            </Box>
            <Flex direction="column" flexGrow="1">
              <Attribute
                text="ACC"
                value={car[ATTRIBUTE_TYPES.ACCELERATION].value}
              />
              <Attribute text="SPD" value={car[ATTRIBUTE_TYPES.SPEED].value} />
              <Attribute
                text="HND"
                value={car[ATTRIBUTE_TYPES.HANDLING].value}
              />
            </Flex>
          </Flex>
        </Flex>
      </Button>
      <CardWinningChance
        minH="24px"
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
