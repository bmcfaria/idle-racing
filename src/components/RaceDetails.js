import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/core';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { startRaceAction } from '../state/actions';
import RaceResults from './RaceResults';
import { useLocation } from 'react-router-dom';
import {
  raceSelector,
  garageCarsSelector,
  tracksSelector,
  moneySelector,
  pastRaceSelector,
} from '../state/selectors';
import { winProbability } from '../helpers/utils';
import styled from '@emotion/styled';

const Triangle = styled(({ track, ...props }) => {
  const width = 40;
  const height = (width * Math.sqrt(3)) / 2;
  const border = 1;

  const pointValue = (value = 0, x, y) => {
    // value comes in percentage [0, 1]

    const tmpValueWidth = ((value + 0.5) * width) / 1.5 / 2;
    const tmpValueHeight = (tmpValueWidth * Math.sqrt(3)) / 2;

    const middleHeightTriangle =
      height + 2 * border - ((width / 2) * Math.sqrt(3)) / 2;

    return `${width / 2 + tmpValueWidth * x + border},${
      middleHeightTriangle + tmpValueHeight * y + border
    }`;
  };

  const accPoint = pointValue(track?.acceleration, -1, 1);
  const tspPoint = pointValue(track?.topSpeed, 0, -1);
  const hanPoint = pointValue(track?.handling, 1, 1);

  return (
    <div {...props}>
      <svg width={width + 2 * border} height={height + 2 * border}>
        <polygon
          className="outer-triangle"
          points={`
            ${width / 2 + border},${0 + border} 
            ${0 + border},${height + border} 
            ${width + border},${height + border}
          `}
        />
        <polygon
          className="inner-triangle"
          points={`
            ${tspPoint} 
            ${accPoint} 
            ${hanPoint}
          `}
        />
        Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  );
})`
  margin: 4px;

  .outer-triangle {
    fill: transparent;
    stroke: black;
    stroke-width: 1;
  }

  .inner-triangle {
    fill: #2f80ed80;
    stroke-width: 1;
  }
`;

const winningChances = {
  0: { text: 'BAD', color: 'tomato' },
  1: { text: 'MAYBE', color: 'Goldenrod' },
  2: { text: 'AVERAGE', color: 'Goldenrod' },
  3: { text: 'GOOD', color: 'LimeGreen' },
};

const RaceDetails = ({
  track: { name, type, image, prizes, duration, price, race },
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const money = useSelector(moneySelector);
  const cars = useSelector(garageCarsSelector);
  const tracks = useSelector(tracksSelector);
  const selectedTrackId = location?.state?.track;
  const selectedCarId = location?.state?.car;
  const selectedTrack = tracks.find(item => item.id === selectedTrackId);
  const selectedCar = cars.find(item => item.id === selectedCarId);

  const pastRace = useSelector(pastRaceSelector(selectedTrack.lastRace));
  const results = !!pastRace && pastRace.checked === false;

  const currentRace = useSelector(raceSelector(race));

  const winProbabilityValue = winProbability(selectedCar, selectedTrack);

  const startRace = () => {
    dispatch(startRaceAction(selectedCarId, selectedTrackId));
  };

  return (
    <Box position="relative" w="16rem">
      {currentRace && <CardProgressOverlay race={currentRace} />}
      {results && <RaceResults zIndex="1" pastRace={pastRace} />}

      <Flex flexDirection="column" marginTop="0.6rem" padding="0 0.2rem 0.6rem">
        <Image w="100%" h="8rem" alt="car" bg="lightgray" />
        <Text textAlign="center" w="100%" fontSize="md" src={image}>
          {name}
        </Text>
        <Flex justifyContent="space-between">
          <Box w="6rem">
            <Text textAlign="left" w="100%" fontSize="sm">
              Type: {type}
            </Text>
            <Triangle track={selectedTrack} />
          </Box>
          <Box>
            <Text textAlign="left" w="100%" fontSize="sm">
              Requirements: {type} cars
            </Text>
            <Text textAlign="left" fontSize="sm">
              Prizes:
            </Text>
            {prizes.map(prize => (
              <Text
                textAlign="left"
                fontSize="xs"
                lineHeight="1rem"
                key={prize}
              >
                ${prize}
              </Text>
            ))}
            <Text textAlign="left" fontSize="xs">
              Duration: {duration}s
            </Text>
          </Box>
        </Flex>
        <Text
          textAlign="left"
          w="100%"
          fontSize="xs"
          color={winningChances[winProbabilityValue].color}
        >
          Winning chances: {winningChances[winProbabilityValue].text}
        </Text>
        <Text textAlign="center" w="100%" fontSize="xs">
          (Try upgrading your car or use a better one, to improve your chances
          of winning)
        </Text>
        <Button
          borderColor="tomato"
          color="tomato"
          variant="outline"
          isDisabled={money < price || currentRace}
          marginTop="0.2rem"
          marginLeft="auto"
          marginRight="auto"
          onClick={startRace}
        >
          Race (${price})
        </Button>
      </Flex>
    </Box>
  );
};

RaceDetails.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {},
};

export default RaceDetails;
