import React from 'react';
import CardProgressOverlay from './CardProgressOverlay';
import { colors } from '../helpers/theme';
import CardCarSmall from './CardCarSmall';
import { useRace } from '../helpers/hooksRace';

const CardCarGarage = ({ car, showAttributes, ...props }) => {
  const { race, reward } = car;

  const currentRace = useRace(race);

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
      // Override notification prop if car in race
      {...(currentRace && { notification: false })}
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
