import React, { useState } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors, MAX_WIDTH_VALUE } from '../helpers/theme';
import { buyExperienceBuffAction } from '../state/actions';
import { useExperience } from '../helpers/hooks';
import styled from '@emotion/styled';
import ExperienceUpgradesCard from './ExperienceUpgradesCard';
import experienceObject, { experienceTip } from '../helpers/experience';

const TextWithAnimation = styled(Text)`
  animation: ${({ blink }) =>
    blink ? 'not-enough-experience-points 0.5s ease 3' : 'none'};

  @keyframes not-enough-experience-points {
    50% {
      background-color: ${colors.red};
    }
    100% {
      background-color: inherit;
    }
  }
`;

const ValueWithAnimation = styled.span`
  animation: ${({ blink }) => (blink ? 'exp-value-spent 0.5s ease 1' : 'none')};

  @keyframes exp-value-spent {
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
  const [expValueSpentAnimation, setExpValueSpentAnimation] = useState();
  const experience = useExperience(expType);

  const buyBuff = (type, subType) => {
    if (experience.availablePoints > 0) {
      dispatch(buyExperienceBuffAction(type, subType));
      setExpValueSpentAnimation(true);
    }
  };

  const currentPoints = Object.keys(experienceObject?.[expType]).reduce(
    (results, key) => results + ~~experience[key],
    0
  );
  const maxPoints = Object.values(experienceObject?.[expType]).reduce(
    (results, { max }) => results + max,
    0
  );

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
              value={experience[subTypeKey]}
              max={subTypeValue.max}
              onClick={() => buyBuff(expType, subTypeKey)}
              innerTextArray={subTypeValue.textArray}
              bg={cardTypeColors[expType]}
              availablePoints={experience.availablePoints}
              lockedText={subTypeValue.lockedText?.(experience.exp)}
              confirmationState={confirmationState}
              setConfirmationState={setConfirmationState}
              notEnoughPointsCb={() => setNotEnoughPointsAnimation(true)}
              key={`${expType}_${subTypeKey}`}
            />
          )
        )}
      </Box>
      {currentPoints < maxPoints && (
        <TextWithAnimation
          marginTop="16px"
          textAlign="center"
          padding="0 8px"
          blink={notEnoughPointsAnimation}
          onAnimationEnd={() => setNotEnoughPointsAnimation()}
        >
          Available points:{' '}
          <ValueWithAnimation
            blink={expValueSpentAnimation}
            onAnimationEnd={() => setExpValueSpentAnimation()}
          >
            {experience.availablePoints}
          </ValueWithAnimation>
        </TextWithAnimation>
      )}
      {experience.exp < experience.max && (
        <>
          <Text
            fontSize="14px"
            lineHeight="16px"
            marginTop="8px"
            text
            textAlign="center"
          >
            ({experienceTip[expType].message})
          </Text>
          {experienceTip[expType].submessage && (
            <Text fontSize="14px" lineHeight="16px" text textAlign="center">
              ({experienceTip[expType].submessage})
            </Text>
          )}
        </>
      )}
    </Flex>
  );
};

export default ExperienceUpgrades;
