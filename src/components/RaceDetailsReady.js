import React, { useState, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { autoRaceEnabledSelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import RaceDetailsSelectedCar from './RaceDetailsSelectedCar';
import { PROBABILITY_GOOD_VALUE } from '../helpers/utils';
import Button from './Button';
import { RaceContext } from '../helpers/context';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh.svg';

const RaceDetailsReady = ({
  selectedCar,
  selectedTrack,
  carsModalOpen,
  enoughMoney,
  currentRace,
  startRace,
  meetsRequirements,
  again,
  ...props
}) => {
  const autoEnabled = useSelector(autoRaceEnabledSelector);

  const [auto, setAuto] = useState();
  const { winProbabilityValue } = useContext(RaceContext);

  const goodChances = winProbabilityValue === PROBABILITY_GOOD_VALUE;

  const toggleAuto = () => {
    setAuto(!auto);
  };

  const startRaceWithAuto = () => {
    startRace(auto);
  };

  return (
    <Flex h="100%" direction="column" {...props}>
      <RaceDetailsSelectedCar
        car={selectedCar}
        track={selectedTrack}
        carsModalOpen={carsModalOpen}
      />
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        padding="16px"
      >
        {autoEnabled && (
          <Button
            w="32px"
            minW="32px"
            h="32px"
            padding="0"
            isDisabled={!goodChances}
            bg={auto ? colors.blue : colors.white}
            color={auto ? colors.white : colors.darkGray}
            {...(auto && { boxShadow: 'none' })}
            _hover={{
              bg: colors.blue,
              color: colors.white,
              boxShadow: 'none',
            }}
            whiteSpace={'normal'}
            onClick={toggleAuto}
          >
            Auto {auto ? 'ON' : 'OFF'}
          </Button>
        )}
        <Button
          w="96px"
          {...(autoEnabled && { marginLeft: '12px' })}
          isDisabled={!enoughMoney || currentRace || !meetsRequirements}
          bg={colors.white}
          color={colors.darkGray}
          _hover={{
            bg: colors.blue,
            color: colors.white,
            boxShadow: 'none',
          }}
          onClick={startRaceWithAuto}
        >
          {again && (
            <Box w="14px" h="14px" as={RefreshIcon} marginRight="8px" />
          )}
          Race
        </Button>
      </Flex>
    </Flex>
  );
};

export default RaceDetailsReady;
