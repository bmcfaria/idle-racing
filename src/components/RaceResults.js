import React from 'react';
import { Text, Button, Flex } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { closeResultsAction } from '../state/actions';

const RaceResults = ({
  pastRace: { id, reward, position, results },
  ...props
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(closeResultsAction(id));
  };

  return (
    <Flex
      direction="column"
      position="absolute"
      w="100%"
      bg="blackAlpha.800"
      {...props}
    >
      <Text color="white" ontSize="sm">
        {`You placed: ${position}`}
      </Text>
      <Text color="white" ontSize="sm">
        {`Reward: $${reward}`}
      </Text>
      {results.map((car, index) => (
        <Text color="white" ontSize="xs" lineHeight="1rem" key={car.id}>
          {index + 1}: {car.name}
        </Text>
      ))}
      <Button
        variant="outline"
        bg="white"
        marginLeft="auto"
        marginRight="auto"
        onClick={onClick}
      >
        Ok
      </Button>
    </Flex>
  );
};

export default RaceResults;
