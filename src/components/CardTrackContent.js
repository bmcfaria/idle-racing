import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import RadarChartTrack from './RadarChartTrack';

const CardTrackContent = ({ track, imageBorderRadius, ...props }) => {
  const { name, type, image, prizes, duration, price } = track;

  return (
    <Box w="304px" h="396px" bg="white" {...props}>
      <Image
        w="100%"
        h="190px"
        alt="car"
        objectFit="cover"
        borderRadius={imageBorderRadius}
        src={
          image ||
          'https://images.unsplash.com/photo-1527757780101-05985993b2e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80'
        }
      />
      <Text textAlign="center" w="100%" h="36px" fontSize="24px">
        {name}
      </Text>
      <Flex>
        <Flex
          w="50%"
          direction="column"
          justifyContent="space-between"
          paddingLeft="24px"
        >
          <Text textAlign="left" w="100%" fontSize="14px">
            Type: {type}
          </Text>
          <RadarChartTrack track={track} />
          <Box>
            <Text textAlign="left" w="100%" fontSize="14px" marginTop="8px">
              Price:
            </Text>
            <Text textAlign="left" w="100%" fontSize="12px">
              -${price}
            </Text>
          </Box>
        </Flex>
        <Box w="50%">
          <Text textAlign="left" w="100%" fontSize="14px">
            Requirements:
          </Text>
          <Text textAlign="left" w="100%" fontSize="12px">
            - 4x4 Cars
          </Text>
          <Text textAlign="left" w="100%" fontSize="14px" marginTop="8px">
            Prizes:
          </Text>
          {prizes.map((prize, index) => (
            <Text
              textAlign="left"
              w="100%"
              fontSize="12px"
              lineHeight="16px"
              key={prize}
            >
              {index + 1} - ${prize}
            </Text>
          ))}
          <Text textAlign="left" w="100%" fontSize="14px" marginTop="8px">
            Duration:
          </Text>
          <Text textAlign="left" w="100%" fontSize="12px">
            - {duration / 1000}s
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardTrackContent;
