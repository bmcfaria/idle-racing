import React from 'react';
import CardProgressOverlay from './CardProgressOverlay';
import { raceSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../helpers/theme';
import CardCarSmall from './CardCarSmall';

const CardCarGarage = ({ car, showAttributes, ...props }) => {
  const { race, reward } = car;

  const currentRace = useSelector(raceSelector(race));

  const onClickPrevent = () => {
    return;
  };

  return (
    <CardCarSmall
      w="160px"
      h="180px"
      bg={colors.darkGray}
      infoBgColor={reward ? colors.green : colors.lightBlue}
      showAttributes
      car={car}
      onClick={currentRace ? onClickPrevent : undefined}
      {...props}
    >
      {currentRace && (
        <CardProgressOverlay
          race={currentRace}
          car={car}
          label
          borderRadius="16px"
          zIndex="1"
          showSeconds
        />
      )}
    </CardCarSmall>
  );
};

export default CardCarGarage;
