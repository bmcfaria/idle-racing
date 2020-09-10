import React from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeResultsAction } from '../state/actions';
import {
  dealerCarsSelector,
  garageCarsSelector,
  trackSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import Button from './Button';
import { useRacePrizesWithBuff } from '../helpers/hooks';
import { formatMoney } from '../helpers/utils';

const Row = ({ index, car, playerCarId, prize }) => (
  <Flex
    w="100%"
    fontSize="12px"
    lineHeight="12px"
    color={car?.id === playerCarId ? colors.blue : colors.white}
    cursor="pointer"
  >
    <Text w="8px" textAlign="center">
      {index + 1}
    </Text>
    <Text marginLeft="2px">- {car ? car.name : '[selled car]'}</Text>
    <Text marginLeft="auto">{formatMoney(prize)}</Text>
  </Flex>
);

const RaceResults = ({ pastRace, raceAgain, selectCar, ...props }) => {
  const { id, results, track: trackId } = pastRace;
  const cars = useSelector(dealerCarsSelector);
  const track = useSelector(trackSelector(trackId));
  const calculatedPrizes = useRacePrizesWithBuff(track.prizes);
  const carsGarage = useSelector(garageCarsSelector);
  const dispatch = useDispatch();

  const selectCarClick = () => {
    dispatch(closeResultsAction(id));
    selectCar();
  };

  const raceAgainClick = () => {
    dispatch(closeResultsAction(id));
    raceAgain();
  };

  return (
    <Flex direction="column" w="100%" h="100%" {...props}>
      <Box margin="8px 12px 0">
        {results.map((car, index) => (
          <Row
            key={`${car.id}_${index}`}
            index={index}
            car={
              cars.find(item => item.id === car.id) ||
              carsGarage.find(item => item.id === car.id)
            }
            playerCarId={pastRace.car}
            prize={`$${~~calculatedPrizes[index]}`}
          />
        ))}
      </Box>
      <Flex w="100%" margin="auto auto 20px" justifyContent="space-evenly">
        <Button
          w="32px"
          minW="32px"
          padding="0"
          bg={colors.white}
          color={colors.darkGray}
          _hover={{
            bg: colors.blue,
            color: colors.white,
          }}
          onClick={raceAgainClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7928 8.53116C15.4461 8.58225 15.943 9.15686 15.796 9.79543C15.4585 11.2607 14.7127 12.6097 13.6338 13.6798C12.2725 15.0301 10.4715 15.8465 8.55879 15.9805C6.64607 16.1144 4.74887 15.5569 3.21268 14.4095C1.67648 13.2621 0.60349 11.6011 0.18909 9.72901C-0.22531 7.85692 0.0464524 5.89827 0.954886 4.20973C1.86332 2.52118 3.348 1.21508 5.13855 0.529256C6.9291 -0.156566 8.90642 -0.176482 10.7104 0.473136C11.7555 0.849464 12.7021 1.43598 13.4968 2.18752C13.693 1.67745 14.2222 1.35266 14.7855 1.43546C15.4383 1.53141 15.8897 2.13838 15.7937 2.79117L15.4488 5.13759C15.4373 5.2157 15.4185 5.29093 15.3932 5.36268C15.3877 5.39036 15.3813 5.41805 15.3737 5.44569C15.2004 6.08233 14.5439 6.45793 13.9072 6.28464L11.6189 5.66172C10.9822 5.48842 10.6066 4.83185 10.7799 4.19521C10.8666 3.8766 11.0744 3.62337 11.3401 3.4716C10.9051 3.15071 10.4229 2.89178 9.90644 2.70581C8.63755 2.24889 7.24676 2.2629 5.98734 2.74529C4.72792 3.22768 3.68364 4.14635 3.04467 5.33403C2.4057 6.5217 2.21455 7.89936 2.50603 9.21614C2.79751 10.5329 3.55222 11.7012 4.63274 12.5082C5.71325 13.3153 7.04769 13.7074 8.39304 13.6132C9.73839 13.519 11.0052 12.9448 11.9627 11.995C12.6372 11.3259 13.1267 10.5019 13.3938 9.60314C13.5805 8.97501 14.1395 8.48008 14.7928 8.53116Z"
              fill="currentColor"
            />
          </svg>
        </Button>
        <Button
          w="96px"
          bg={colors.white}
          color={colors.darkGray}
          _hover={{
            bg: colors.blue,
            color: colors.white,
          }}
          onClick={selectCarClick}
        >
          Select car
        </Button>
      </Flex>
    </Flex>
  );
};

export default RaceResults;
