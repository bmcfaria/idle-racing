import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import CardWinningChance from './CardWinningChance';
import { getImage } from '../helpers/imageMapping';

const RaceDetailsSelectedCar = ({ car, track, carsModalOpen, ...props }) => {
  return (
    <Box {...props}>
      <Flex h="44px" padding="0 16px">
        <Image
          w="80px"
          h="40px"
          margin="auto"
          alt="car"
          objectFit="contain"
          style={{ imageRendering: 'pixelated' }}
          src={getImage(car)}
        />
        <Box flexGrow="1" paddingLeft="16px" margin="auto 0">
          <Text textAlign="center" fontSize="18px">
            {car.name}
          </Text>
          <Flex fontSize="12px" justifyContent="space-between">
            <Text>Acc: {car.acc.value}</Text>
            <Text>Tsp: {car.tsp.value}</Text>
            <Text>Hnd: {car.hnd.value}</Text>
          </Flex>
        </Box>
      </Flex>
      <CardWinningChance
        car={car}
        track={track}
        borderRadius="16px"
        border="1px solid black"
        w="calc(100% - 16px)"
        h="24px"
        margin="0 auto"
      />
      <Flex
        w="100%"
        h="32px"
        padding="0 8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <ChakraLink fontSize="12px" color="tomato" onClick={carsModalOpen}>
          Change car
        </ChakraLink>
        <ChakraLink
          as={Link}
          to={{ pathname: '/garage', state: { car: car.id } }}
          fontSize="12px"
          color="teal.500"
        >
          Open in Garage
        </ChakraLink>
      </Flex>
      {false && (
        <Box h="40px">
          <Text textAlign="center" w="100%" fontSize="12px">
            (Try upgrading your car or use a better one, to improve your chances
            of winning)
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default RaceDetailsSelectedCar;
