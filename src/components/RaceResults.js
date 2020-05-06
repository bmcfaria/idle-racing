import React from 'react';
import { Text, Button, Flex, Image, Box } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeResultsAction } from '../state/actions';
import {
  dealerCarsSelector,
  garageCarsSelector,
  trackSelector,
} from '../state/selectors';
import { getImage } from '../helpers/imageMapping';

const Row = ({ index, car, playerCarId, prize }) => (
  <Flex
    fontSize="14px"
    lineHeight="1rem"
    fontWeight={car.id === playerCarId ? 'bold' : 'unset'}
    cursor="pointer"
  >
    {index + 1}:
    <Image
      src={getImage(car)}
      objectFit="contain"
      w="24px"
      h="16px"
      display="inline-block"
      marginLeft="4px"
    />
    <Text marginLeft="4px">
      {car.id === playerCarId ? '(You) ' : ''}
      {car.name}
    </Text>
    <Text marginLeft="auto">{prize}</Text>
  </Flex>
);

const RaceResults = ({ pastRace, children, ...props }) => {
  const { id, results, track: trackId } = pastRace;
  const cars = useSelector(dealerCarsSelector);
  const track = useSelector(trackSelector(trackId));
  const carsGarage = useSelector(garageCarsSelector);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(closeResultsAction(id));
  };

  return (
    <Flex direction="column" w="100%" {...props}>
      <Text fontSize="18px" textAlign="center" marginTop="8px">
        Results
      </Text>
      <Box>
        {results.map((car, index) => (
          <Row
            key={`${car.id}_${index}`}
            index={index}
            car={
              cars.find(item => item.id === car.id) ||
              carsGarage.find(item => item.id === car.id)
            }
            playerCarId={pastRace.car}
            prize={`$${~~track.prizes[index]}`}
          />
        ))}
      </Box>
      <Button
        variant="outline"
        marginLeft="auto"
        marginRight="auto"
        marginTop="8px"
        marginBottom="8px"
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default RaceResults;
