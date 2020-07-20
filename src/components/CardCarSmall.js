import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import CardProgressOverlay from './CardProgressOverlay';
import {
  raceSelector,
  garageCarsSelector,
  moneySelector,
} from '../state/selectors';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { capitalize, ATTRIBUTE_TYPES } from '../helpers/utils';
import { colors } from '../helpers/theme';
import getImageCar from '../helpers/imageMappingCars';
import AttributeCircle from './AttributeCircle';
import Button from './Button';

const BlinkCard = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;
  animation: ${({ blink }) => (blink ? 'blink 1s ease infinite' : 'none')};
  padding: 0;

  :hover {
    animation: none;
  }

  @keyframes blink {
    50% {
      box-shadow: none;
    }
    100% {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

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

const CardCarSmall = ({
  car,
  stripped,
  onClick,
  garage,
  notification,
  ...props
}) => {
  const { id, race } = car;
  const location = useLocation();
  const history = useHistory();
  const garageCars = useSelector(garageCarsSelector);
  const money = useSelector(moneySelector);
  const [bought, setBought] = useState();

  const currentRace = useSelector(raceSelector(race));

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
    <BlinkCard
      w="160px"
      h={garage ? '180px' : '148px'}
      position="relative"
      onClick={setSelected}
      cursor="pointer"
      borderRadius="16px"
      blink={garage && notification}
      bg={colors.darkGray}
      {...props}
    >
      {!garage && (
        <Text
          fontSize="14px"
          lineHeight="24px"
          textAlign="center"
          w="100%"
          marginTop="auto"
          color={money < car.price ? colors.red : colors.white}
        >
          ${car.price}
        </Text>
      )}
      <Flex
        w="100%"
        h={garage ? '100%' : '124px'}
        direction="column"
        borderRadius="16px"
        bg={color}
        position="absolute"
        top="0"
      >
        <Text
          fontSize="14px"
          lineHeight="24px"
          textAlign="center"
          w="100%"
          marginTop="100px"
        >
          {car.name}
        </Text>
        {garage && (
          <Flex justifyContent="space-evenly">
            <AttributeCircle
              attr={car[ATTRIBUTE_TYPES.ACCELERATION]}
              text="ACC"
            />
            <AttributeCircle attr={car[ATTRIBUTE_TYPES.SPEED]} text="SPD" />
            <AttributeCircle attr={car[ATTRIBUTE_TYPES.HANDLING]} text="HND" />
          </Flex>
        )}
      </Flex>
      <Box
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
      </Box>
      {bought && (
        <BoughtAnimation
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg={colors.green}
          borderRadius="16px"
        >
          <Text fontSize="24px" margin="auto">
            Bought
          </Text>
        </BoughtAnimation>
      )}
      {currentRace && (
        <CardProgressOverlay
          race={currentRace}
          car={car}
          label
          borderRadius="16px"
        />
      )}
    </BlinkCard>
  );
};

export default CardCarSmall;
