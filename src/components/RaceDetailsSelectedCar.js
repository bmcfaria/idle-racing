import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import RaceDetailsSelectedCarWinningChance from './RaceDetailsSelectedCarWinningChance';
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

      <RaceDetailsSelectedCarWinningChance
        marginTop="4px"
        car={car}
        track={track}
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
    </Box>
  );
};

export default RaceDetailsSelectedCar;
