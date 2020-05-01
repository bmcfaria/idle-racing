import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import RadarChartTrack from './RadarChartTrack';
import { getImage } from '../helpers/imageMapping';

const CardTrackContent = ({ track, imageBorderRadius, ...props }) => {
  const { name, type, prizes, duration, price } = track;

  return (
    <Box w="304px" h="396px" bg="white" {...props}>
      <Image
        w="100%"
        h="190px"
        alt="track"
        objectFit="cover"
        borderRadius={imageBorderRadius}
        src={getImage(track)}
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
