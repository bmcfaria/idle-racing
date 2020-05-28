import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';
import RaceDetailsSelectedCarWinningChance from './RaceDetailsSelectedCarWinningChance';
import { getImageCar } from '../helpers/imageMapping';
import { colors } from '../helpers/theme';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import Button from './Button';

const RaceDetailsSelectedCar = ({ car, track, carsModalOpen, ...props }) => {
  return (
    <Flex w="100%" h="100%" direction="column">
      <Button
        w="144px"
        h="64px"
        margin="8px auto"
        border={`1px solid ${colors.white}`}
        bg="transparent"
        color={colors.white}
        _hover={{
          boxShadow: 'none',
          borderColor: colors.blue,
          svg: {
            color: colors.blue,
          },
        }}
        onClick={carsModalOpen}
      >
        <Flex
          w="100%"
          h="100%"
          borderRadius="4px"
          direction="column"
          justifyContent="space-evenly"
        >
          <Text textAlign="center" fontSize="14px" lineHeight="14px">
            {car.name}
          </Text>
          <Flex w="100%" justifyContent="space-evenly" lineHeight="14px">
            <Box top="4px" right="4px" position="absolute" color={colors.white}>
              <svg
                width="9"
                height="8"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.48217 1.02827C5.24724 0.792305 5.24809 0.410571 5.48405 0.175644C5.72002 -0.059282 6.10176 -0.0584384 6.33668 0.177529L7.83534 1.68282C7.97916 1.79301 8.0719 1.96652 8.0719 2.1617C8.0719 2.24658 8.05436 2.32736 8.02271 2.40062C7.99767 2.50614 7.94387 2.60621 7.86133 2.68832L6.33442 4.20719C6.09835 4.44202 5.71662 4.44101 5.48179 4.20494C5.24697 3.96887 5.24797 3.58714 5.48404 3.35231L6.07487 2.7646H2.49507C2.1621 2.7646 1.89217 2.49467 1.89217 2.1617C1.89217 1.82873 2.1621 1.5588 2.49507 1.5588H6.01036L5.48217 1.02827ZM2.58894 4.64578C2.82387 4.40981 2.82303 4.02808 2.58706 3.79315C2.35109 3.55822 1.96936 3.55907 1.73443 3.79503L0.233162 5.30295C0.0912823 5.41326 0 5.58557 0 5.7792C0 5.86191 0.0166536 5.94073 0.0467904 6.01248C0.071269 6.11994 0.125481 6.22197 0.209391 6.30543L1.7363 7.8243C1.97237 8.05913 2.3541 8.05812 2.58893 7.82205C2.82375 7.58598 2.82274 7.20425 2.58668 6.96942L1.99625 6.3821H5.57683C5.9098 6.3821 6.17973 6.11218 6.17973 5.7792C6.17973 5.44623 5.9098 5.1763 5.57683 5.1763H2.06076L2.58894 4.64578Z"
                  fill="currentColor"
                />
              </svg>
            </Box>
            <Box w="40px">
              <Text textAlign="center" fontSize="12px">
                ACC
              </Text>
              <Text textAlign="center" fontSize="14px">
                {car[ATTRIBUTE_TYPES.ACCELERATION].value}
              </Text>
            </Box>
            <Box w="40px">
              <Text textAlign="center" fontSize="12px">
                TSP
              </Text>
              <Text textAlign="center" fontSize="14px">
                {car[ATTRIBUTE_TYPES.TOP_SPEED].value}
              </Text>
            </Box>
            <Box w="40px">
              <Text textAlign="center" fontSize="12px">
                HND
              </Text>
              <Text textAlign="center" fontSize="14px">
                {car[ATTRIBUTE_TYPES.HANDLING].value}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Button>
      <RaceDetailsSelectedCarWinningChance car={car} track={track} />
    </Flex>
    // <Box {...props}>
    //   <Flex h="44px" padding="0 16px">
    //     <Image
    //       w="80px"
    //       h="40px"
    //       margin="auto"
    //       alt="car"
    //       objectFit="contain"
    //       style={{ imageRendering: 'pixelated' }}
    //       src={getImageCar(car)}
    //     />
    //     <Box flexGrow="1" paddingLeft="16px" margin="auto 0">
    //       <Text textAlign="center" fontSize="18px">
    //         {car.name}
    //       </Text>
    //       <Flex fontSize="12px" justifyContent="space-between">
    //         <Text>Acc: {car.acc.value}</Text>
    //         <Text>Tsp: {car.tsp.value}</Text>
    //         <Text>Hnd: {car.hnd.value}</Text>
    //       </Flex>
    //     </Box>
    //   </Flex>

    //   <Flex
    //     w="100%"
    //     h="32px"
    //     padding="0 8px"
    //     justifyContent="space-between"
    //     alignItems="center"
    //   >
    //     <ChakraLink fontSize="12px" color="tomato" onClick={carsModalOpen}>
    //       Change car
    //     </ChakraLink>
    //     <ChakraLink
    //       as={Link}
    //       to={{ pathname: '/garage', state: { car: car.id } }}
    //       fontSize="12px"
    //       color="teal.500"
    //     >
    //       Open in Garage
    //     </ChakraLink>
    //   </Flex>
    // </Box>
  );
};

export default RaceDetailsSelectedCar;
