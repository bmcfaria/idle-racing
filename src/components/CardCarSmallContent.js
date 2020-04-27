import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import AttributeInfo from './AttributeInfo';

const CardCarSmallContent = ({
  car: { name, type, image, acceleration, topSpeed, handling },
  ...props
}) => (
  <Flex minW="304px" w="304px" h="100px" verticalAlign="top" {...props}>
    <Box w="50%">
      <Image
        w="112px"
        h="64px"
        padding="16px 16px 0 0"
        alt="car"
        objectFit="contain"
        style={{ imageRendering: 'pixelated' }}
        src={image}
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
        value={acceleration.value}
        upgrade={acceleration.upgrade}
        max={acceleration.max}
      />
      <AttributeInfo
        name="Top Speed"
        value={topSpeed.value}
        upgrade={topSpeed.upgrade}
        max={topSpeed.max}
      />
      <AttributeInfo
        name="Handling"
        value={handling.value}
        upgrade={handling.upgrade}
        max={handling.max}
      />
    </Box>
  </Flex>
);

export default CardCarSmallContent;
