import React, { useContext, useState } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import {
  dealerCarsSelector,
  garageCarsSelector,
  pastRacesSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import Button from './Button';
import { formatMoney } from '../helpers/utils';
import { ReactComponent as TriangeIcon } from '../assets/icons/triangle.svg';
import { RaceContext } from '../helpers/context';

const Row = ({ index, car, playerCarId, prize = 0 }) => (
  <Flex
    w="100%"
    fontSize="14px"
    lineHeight="14px"
    color={car?.id === playerCarId ? colors.blue : colors.white}
  >
    <Text w="8px" textAlign="center">
      {index + 1}
    </Text>
    <Text marginLeft="2px">- {car ? car.name : '[selled car]'}</Text>
    {isNaN(prize) && <Text marginLeft="auto">CAR</Text>}
    {!isNaN(prize) && <Text marginLeft="auto">${formatMoney(prize)}</Text>}
  </Flex>
);

const RaceResults = props => {
  const { trackId } = useContext(RaceContext);
  const [pastRaceIndex, setPastRaceIndex] = useState(0);
  const cars = useSelector(dealerCarsSelector);
  const pastRaces = useSelector(pastRacesSelector).filter(
    ({ track }) => track === trackId
  );

  const carsGarage = useSelector(garageCarsSelector);

  const pastRace = pastRaces?.[pastRaceIndex];

  if (!pastRace) {
    return null;
  }

  const leftNavigation = () => {
    if (pastRaceIndex > 0) {
      setPastRaceIndex(pastRaceIndex - 1);
    }
  };

  const rightNavigation = () => {
    if (pastRaceIndex < pastRaces.length - 1) {
      setPastRaceIndex(pastRaceIndex + 1);
    }
  };

  return (
    <Flex direction="column" w="100%" h="100%" padding="8px" {...props}>
      <Text
        textAlign="center"
        fontSize="16px"
        lineHeight="16px"
        color={colors.white}
      >
        Previous Races
      </Text>
      <Box marginTop="8px">
        {pastRace?.results.map((car, index) => (
          <Row
            key={`${car.id}_${index}`}
            index={index}
            car={
              cars.find(item => item.id === car.id) ||
              carsGarage.find(item => item.id === car.id)
            }
            playerCarId={pastRace.car}
            prize={pastRace.prizes[index]}
          />
        ))}
      </Box>
      <Flex
        w="100%"
        marginTop="8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          w="32px"
          minW="32px"
          padding="0"
          bg={colors.white}
          color={colors.darkGray}
          _hover={{
            bg: colors.blue,
            color: colors.white,
            boxShadow: 'none',
          }}
          onClick={leftNavigation}
          isDisabled={pastRaceIndex <= 0}
        >
          <Box w="20px" h="20px" as={TriangeIcon} transform="rotate(-90deg)" />
        </Button>
        <Text fontSize="16px" lineHeight="16px" color={colors.white}>
          {pastRaceIndex + 1}/{pastRaces.length}
        </Text>
        <Button
          w="32px"
          minW="32px"
          padding="0"
          bg={colors.white}
          color={colors.darkGray}
          _hover={{
            bg: colors.blue,
            color: colors.white,
            boxShadow: 'none',
          }}
          onClick={rightNavigation}
          isDisabled={pastRaceIndex >= pastRaces.length - 1}
        >
          <Box w="20px" h="20px" as={TriangeIcon} transform="rotate(90deg)" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default RaceResults;
