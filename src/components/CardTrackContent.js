import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import RadarChartTrack from './RadarChartTrack';
import { getImage } from '../helpers/imageMapping';

const CardTrackContent = ({ track, imageBorderRadius, children, ...props }) => {
  const { name, prizes, duration, price } = track;

  return (
    <Box w="100%" h="100%" bg="black" {...props}>
      <Flex w="100%" h="40px">
        <Text margin="auto" fontSize="24px" color="white">
          {name}
        </Text>
      </Flex>
      <Box
        w="100%"
        h="74px"
        position="relative"
        borderLeft="1px solid black"
        borderRight="1px solid black"
      >
        <Image
          w="100%"
          h="100%"
          alt="track"
          objectFit="cover"
          src={getImage(track)}
        />
        <Box
          w="100%"
          h="100%"
          top="0"
          left="0"
          position="absolute"
          backgroundImage="linear-gradient(to right, #000F , #0000)"
        />
        <RadarChartTrack
          track={track}
          position="absolute"
          top="2px"
          left="16px"
        />
      </Box>
      <Flex
        w="100%"
        h="90px"
        bg="white"
        paddingTop="8px"
        paddingLeft="32px"
        borderLeft="1px solid black"
        borderRight="1px solid black"
      >
        <Box w="50%">
          <Text textAlign="left" w="100%" fontSize="14px">
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
        </Box>
        <Box w="50%">
          <Text textAlign="left" w="100%" fontSize="14px">
            Requirements:
          </Text>
          <Text textAlign="left" w="100%" fontSize="12px">
            - None
          </Text>
        </Box>
      </Flex>

      {children && (
        <Box bg="white" borderTop="1px solid gray">
          {children}
        </Box>
      )}

      <Flex w="100%" h="32px">
        <Text margin="auto" fontSize="14px" color="white">
          {duration / 1000}s
        </Text>
        <Text margin="auto" fontSize="14px" color="white">
          {price === 0 ? 'FREE' : `$${price}`}
        </Text>
      </Flex>
    </Box>
  );
};

export default CardTrackContent;
