import React from 'react';
import { Text, Button, Flex, Image, Box } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeResultsAction } from '../state/actions';
import { dealerCarsSelector, garageCarsSelector } from '../state/selectors';
import { getImage } from '../helpers/imageMapping';

const Row = ({ index, car, playerCarId }) => (
  <Text
    fontSize="14px"
    lineHeight="1rem"
    fontWeight={car.id === playerCarId ? 'bold' : 'unset'}
  >
    {index + 1}:{' '}
    <Image
      src={getImage(car)}
      objectFit="contain"
      w="24px"
      h="16px"
      display="inline-block"
    />{' '}
    {car.id === playerCarId ? '(You) ' : ''}
    {car.name}
  </Text>
);

const RaceResults = ({ pastRace, children, ...props }) => {
  const { id, reward, results } = pastRace;
  const cars = useSelector(dealerCarsSelector);
  const carsGarage = useSelector(garageCarsSelector);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(closeResultsAction(id));
  };

  return (
    <Flex direction="column" w="100%" {...props}>
      <Text fontSize="24px" textAlign="center" marginTop="8px">
        Results
      </Text>
      <Box marginTop="16px">
        {results.map((car, index) => (
          <Row
            key={car.id}
            index={index}
            car={
              cars.find(item => item.id === car.id) ||
              carsGarage.find(item => item.id === car.id)
            }
            playerCarId={pastRace.car}
          >
            {index + 1}: {car.name}
          </Row>
        ))}
      </Box>
      <Text fontSize="14px" marginTop="16px">
        Reward:
      </Text>
      <Text fontSize="12px">{`$${reward}`}</Text>
      <Button
        variant="outline"
        marginLeft="auto"
        marginRight="auto"
        marginTop="32px"
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default RaceResults;
