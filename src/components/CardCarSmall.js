import React, { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import {
  raceSelector,
  tracksSelector,
  moneySelector,
  garageCarsSelector,
} from '../state/selectors';
import { useSelector } from 'react-redux';
import CardCarSmallContent from './CardCarSmallContent';
import CardWinningChance from './CardWinningChance';
import styled from '@emotion/styled';
import { doMeetRequirements } from '../helpers/utils';

const BoughtAnimation = styled(Flex)`
  animation: fadeOut ease 1.5s;
  opacity: 0;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const CardCarSmall = ({ car, stripped, onClick, showPrice, ...props }) => {
  const { id, race, price, reward } = car;
  const location = useLocation();
  const history = useHistory();
  const money = useSelector(moneySelector);
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

  return (
    <Box
      minW="304px"
      w="304px"
      minH="100px"
      position="relative"
      onClick={setSelected}
      cursor={meetsRequirements ? 'pointer' : 'unset'}
      {...props}
    >
      <Box w="100%" h="100px" position="absolute">
        {location?.state?.car === id && (
          <Box
            position="absolute"
            w="100%"
            h="100%"
            borderRadius="16px"
            bg="#B2F5EA77"
          />
        )}
        {bought && (
          <BoughtAnimation
            position="absolute"
            w="100%"
            h="100%"
            bg="blackAlpha.800"
            borderRadius="16px"
          >
            <Text fontSize="24px" margin="auto" color="white">
              Bought
            </Text>
          </BoughtAnimation>
        )}
        {currentRace && (
          <CardProgressOverlay race={currentRace} label borderRadius="16px" />
        )}
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
        <CardCarSmallContent
          padding="0 16px"
          bg="white"
          {...(!stripped && {
            border: '1px solid black',
            borderRadius: '16px',
          })}
          car={car}
        />
      </Box>
      {selectedTrack && (
        <CardWinningChance
          car={car}
          track={selectedTrack}
          meetsRequirements={meetsRequirements}
          w="100%"
          h="124px"
          borderRadius="16px"
          border="1px solid black"
        />
      )}
      {showPrice && (
        <Flex w="100%" h="124px" borderRadius="16px" bg="black">
          <Text
            fontSize="14px"
            lineHeight="24px"
            textAlign="center"
            w="100%"
            marginTop="auto"
            color={money < price ? 'tomato' : 'white'}
          >
            {reward ? 'Reward' : `$${price}`}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default CardCarSmall;
