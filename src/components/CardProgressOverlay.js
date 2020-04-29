import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import CardProgressCircle from './CardProgressCircle';

const CardProgressOverlay = ({ race, label, big, ...props }) => {
  if (!race) {
    return null;
  }

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      flexDirection="column"
      {...props}
    >
      <Flex direction="column" margin="auto">
        <CardProgressCircle
          race={race}
          marginLeft="auto"
          marginRight="auto"
          size={big ? '10rem' : '4rem'}
          textColor="white"
        />
        {label && (
          <Text color="white" fontSize="sm">
            ({race.name})
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default CardProgressOverlay;
