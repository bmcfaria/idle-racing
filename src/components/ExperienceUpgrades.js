import React, { useState } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors, MAX_WIDTH_VALUE } from '../helpers/theme';
import { buyExperienceBuffAction } from '../state/actions';
import { useExperience } from '../helpers/hooks';
import styled from '@emotion/styled';
import ExperienceUpgradesCard from './ExperienceUpgradesCard';
import experienceObject from '../helpers/experience';

const TextWithAnimation = styled(Text)`
  animation: ${({ blink }) =>
    blink ? 'not-enough-experience-points 0.5s ease 3' : 'none'};

  :hover {
    animation: none;
  }

  @keyframes not-enough-experience-points {
    50% {
      background-color: ${colors.red};
    }
    100% {
      background-color: inherit;
    }
  }
`;

const cardTypeColors = {
  business: colors.orange,
  race: colors.green,
  mechanic: colors.lightBlue,
};

const ExperienceUpgrades = ({ expType, ...props }) => {
  const dispatch = useDispatch();
  const [confirmationState, setConfirmationState] = useState();
  const [notEnoughPointsAnimation, setNotEnoughPointsAnimation] = useState();
  const availablePointsObject = useExperience(expType);

  const buyBuff = (type, subType) => {
    if (availablePointsObject.availablePoints > 0) {
      dispatch(buyExperienceBuffAction(type, subType));
    }
  };

  return (
    <Flex
      direction="column"
      w="100vw"
      maxW={`${MAX_WIDTH_VALUE - 2 * 32}px`}
      padding="24px"
      bg={colors.white}
      alignItems="center"
      onClick={() => setConfirmationState()}
      {...props}
    >
      <Box
        w="100%"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(88px, 1fr))"
      >
        {Object.entries(experienceObject?.[expType]).map(
          ([subTypeKey, subTypeValue]) => (
            <ExperienceUpgradesCard
              text={subTypeValue.title}
              value={availablePointsObject[subTypeKey]}
              max={subTypeValue.max}
              onClick={() => buyBuff(expType, subTypeKey)}
              innerTextArray={subTypeValue.textArray}
              bg={cardTypeColors[expType]}
              availablePoints={availablePointsObject.availablePoints}
              lockedText={subTypeValue.lockedText?.(availablePointsObject.exp)}
              confirmationState={confirmationState}
              setConfirmationState={setConfirmationState}
              notEnoughPointsCb={() => setNotEnoughPointsAnimation(true)}
              key={`${expType}_${subTypeKey}`}
            />
          )
        )}
      </Box>
      <TextWithAnimation
        marginTop="16px"
        textAlign="center"
        padding="0 8px"
        blink={notEnoughPointsAnimation}
        onAnimationEnd={() => setNotEnoughPointsAnimation()}
      >{`Available points: ${availablePointsObject.availablePoints}`}</TextWithAnimation>
    </Flex>
  );
};

export default ExperienceUpgrades;
