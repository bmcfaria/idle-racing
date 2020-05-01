import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import AttributeInfo from './AttributeInfo';
import { getImage } from '../helpers/imageMapping';

const CardCarSmallContent = ({ car, ...props }) => {
  const { name, type, acc, tsp, hnd } = car;

  return (
    <Flex minW="304px" w="304px" h="100px" verticalAlign="top" {...props}>
      <Box w="50%">
        <Image
          w="112px"
          h="64px"
          padding="16px 16px 0 0"
          alt="car"
          objectFit="contain"
          style={{ imageRendering: 'pixelated' }}
          src={getImage(car)}
        />
        <Text w="100%" fontSize="sm" marginTop="8px">
          Type: {type}
        </Text>
      </Box>
      <Box w="50%" marginLeft="0.2rem">
        <Text textAlign="left" w="100%" fontSize="md">
          {name}
        </Text>
        <AttributeInfo
          name="Acceleration"
          value={acc.value}
          upgrade={acc.upgrade}
          max={acc.max}
        />
        <AttributeInfo
          name="Top Speed"
          value={tsp.value}
          upgrade={tsp.upgrade}
          max={tsp.max}
        />
        <AttributeInfo
          name="Handling"
          value={hnd.value}
          upgrade={hnd.upgrade}
          max={hnd.max}
        />
      </Box>
    </Flex>
  );
};

export default CardCarSmallContent;
