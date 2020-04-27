import React from 'react';
import { Text, Button, Flex } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { closeResultsAction } from '../state/actions';

const RaceResults = ({
  pastRace: { id, reward, position, results },
  children,
  ...props
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(closeResultsAction(id));
  };

  return (
    <Flex direction="column" w="100%" {...props}>
      <Text ontSize="sm">{`You placed: ${position}`}</Text>
      <Text ontSize="sm">{`Reward: $${reward}`}</Text>
      {results.map((car, index) => (
        <Text ontSize="xs" lineHeight="1rem" key={car.id}>
          {index + 1}: {car.name}
        </Text>
      ))}
      <Button
        variant="outline"
        marginLeft="auto"
        marginRight="auto"
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default RaceResults;
