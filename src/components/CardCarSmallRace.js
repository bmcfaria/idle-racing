import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import {
  raceSelector,
  tracksSelector,
  garageCarsSelector,
} from '../state/selectors';
import { useSelector } from 'react-redux';
import CardWinningChance from './CardWinningChance';
import styled from '@emotion/styled';
import {
  doMeetRequirements,
  capitalize,
  ATTRIBUTE_TYPES,
} from '../helpers/utils';
import { colors } from '../helpers/theme';
import { getImageCar } from '../helpers/imageMapping';
import AttributeCircle from './AttributeCircle';

const CarAttribute = ({ text, attr, ...props }) => (
  <Box w="48px" lineHeight="14px" textAlign="center" {...props}>
    <Text fontSize="12px" color={colors.darkGray}>
      {text}
    </Text>
    <Text fontSize="14px">{attr}</Text>
  </Box>
);

const CardCarSmallRace = ({
  car,
  stripped,
  onClick,
  showPrice,
  garage,
  ...props
}) => {
  const { id, race } = car;
  const location = useLocation();
  const history = useHistory();
  const tracks = useSelector(tracksSelector);
  const garageCars = useSelector(garageCarsSelector);
  const selectedTrackId = location?.state?.track;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const [bought, setBought] = useState();

  const currentRace = useSelector(raceSelector(race));

  const meetsRequirements = doMeetRequirements(
    car,
    selectedTrack?.requirements
  );

  useEffect(() => {
    const currentTime = new Date().getTime();

    garageCars.forEach(element => {
      if (
        element.dealerCar === car.id &&
        currentTime - element.timestamp <= 1000
      ) {
        setBought(true);
      }
    });
  }, [garageCars, car.id, car.timestamp]);

  // To improve mobile navigation,
  // this way the back button will un-select instead off showing the previous selected
  const setSelected = () => {
    if (!meetsRequirements) return;

    if (onClick) {
      onClick(car);

      return;
    }

    if (currentRace) return;

    if (location?.state?.car) {
      history.replace({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    } else {
      history.push({
        pathname: location.pathname,
        state: { ...(location.state || {}), car: id },
      });
    }
  };

  const color = garage ? colors.lightBlue : colors.orange;

  return (
    <Box
      w="160px"
      h="136px"
      position="relative"
      onClick={setSelected}
      cursor={meetsRequirements ? 'pointer' : 'unset'}
      borderRadius="16px"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      {...props}
    >
      <Box w="100%" h="100px" position="absolute">
        {!meetsRequirements && (
          <Flex
            position="absolute"
            w="100%"
            h="100%"
            bg="blackAlpha.800"
            flexDirection="column"
            borderRadius="16px"
          >
            <Text
              fontSize="24px"
              textAlign="center"
              margin="auto"
              color="white"
            >
              Don't meet the requirements
            </Text>
          </Flex>
        )}
      </Box>
      {selectedTrack && (
        <CardWinningChance
          car={car}
          track={selectedTrack}
          meetsRequirements={meetsRequirements}
          w="100%"
          h="100%"
          borderRadius="16px"
        />
      )}
      <Flex
        w="100%"
        h="116px"
        direction="column"
        top="0"
        left="0"
        position="absolute"
        borderRadius="16px"
        bg={colors.lightGray}
      >
        <Flex
          w="100%"
          h="52px"
          border={`1px solid ${colors.lightGray}`}
          borderRadius="16px"
          bg={colors.white}
          justifyContent="space-evenly"
        >
          <Image
            maxW="80px"
            h="100%"
            alt="car"
            borderRadius="16px"
            objectFit="contain"
            src={getImageCar(car)}
          />
          <Flex
            direction="column"
            justifyContent="space-evenly"
            lineHeight="12px"
            textAlign="center"
            fontSize="12px"
          >
            <Text>{capitalize(car.brand)}</Text>
            <Text color={colors.darkGray}>{car.type}</Text>
          </Flex>
        </Flex>
        <Text fontSize="14px" lineHeight="24px" textAlign="center" w="100%">
          {car.name}
        </Text>
        <Flex marginTop="4px" justifyContent="center">
          <CarAttribute
            attr={car[ATTRIBUTE_TYPES.ACCELERATION].value}
            text="ACC"
          />
          <CarAttribute
            attr={car[ATTRIBUTE_TYPES.TOP_SPEED].value}
            text="TSP"
          />
          <CarAttribute attr={car[ATTRIBUTE_TYPES.HANDLING].value} text="HND" />
        </Flex>
      </Flex>
      {/* <Box
        w="100%"
        h="100px"
        position="absolute"
        top="0"
        left="0"
        borderRadius="16px"
        color={colors.darkGray}
        fontSize="12px"
        lineHeight="12px"
      >
        <Image
          w="100%"
          h="100px"
          alt="car"
          borderRadius="16px"
          border={`1px solid ${color}`}
          objectFit="contain"
          bg={colors.white}
          src={getImageCar(car)}
        />
        <Text top="8px" left="8px" position="absolute">
          {capitalize(car.brand)}
        </Text>
        <Text bottom="8px" right="8px" position="absolute">
          {car.type}
        </Text>
      </Box> */}
      {currentRace && (
        <CardProgressOverlay
          race={currentRace}
          car={car}
          label
          borderRadius="16px"
        />
      )}
    </Box>
  );
};

export default CardCarSmallRace;