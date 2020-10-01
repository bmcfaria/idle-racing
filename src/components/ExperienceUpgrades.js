import React, { useState } from 'react';
import { Text, Flex, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { colors, MAX_WIDTH_VALUE } from '../helpers/theme';
import { buyExperienceBuffAction } from '../state/actions';
import {
  useExperienceBusiness,
  useExperienceRace,
  useExperienceMechanic,
} from '../helpers/hooks';
import styled from '@emotion/styled';
import ExperienceUpgradesCard from './ExperienceUpgradesCard';

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

const ExperienceUpgrades = ({ expType, ...props }) => {
  const dispatch = useDispatch();
  const [notEnoughPointsAnimation, setNotEnoughPointsAnimation] = useState();
  const experienceBusiness = useExperienceBusiness();
  const experienceRace = useExperienceRace();
  const experienceMechanic = useExperienceMechanic();

  const availablePointsObject =
    (expType === 'business' && experienceBusiness) ||
    (expType === 'race' && experienceRace) ||
    (expType === 'mechanic' && experienceMechanic) ||
    {};

  const buyBuff = (type, subType) => {
    if (availablePointsObject.availablePoints > 0) {
      dispatch(buyExperienceBuffAction(type, subType));
    } else {
      setNotEnoughPointsAnimation(true);
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
      {...props}
    >
      <Box
        w="100%"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(88px, 1fr))"
      >
        {expType === 'business' && (
          <>
            <ExperienceUpgradesCard
              text="New cars price"
              value={experienceBusiness.newCars}
              max={3}
              onClick={() => buyBuff('business', 'newCars')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.orange}
              availablePoints={availablePointsObject.availablePoints}
            />
            <ExperienceUpgradesCard
              text="Old cars price"
              value={experienceBusiness.usedCars}
              max={3}
              onClick={() => buyBuff('business', 'usedCars')}
              innerTextArray={['+0%', '+10%', '+20%', '+30%']}
              bg={colors.orange}
              availablePoints={availablePointsObject.availablePoints}
            />
            <ExperienceUpgradesCard
              text="Buy reward cars"
              value={experienceBusiness.rewardCars}
              max={1}
              onClick={() => buyBuff('business', 'rewardCars')}
              innerTextArray={['OFF', 'ON']}
              bg={colors.orange}
              availablePoints={availablePointsObject.availablePoints}
              lockedText={
                experienceBusiness.exp < 50
                  ? `Missing ${50 - experienceBusiness.exp} exp to unlock`
                  : undefined
              }
            />
          </>
        )}

        {expType === 'race' && (
          <>
            <ExperienceUpgradesCard
              text="Race price"
              value={experienceRace.price}
              max={3}
              onClick={() => buyBuff('race', 'price')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.green}
              availablePoints={availablePointsObject.availablePoints}
            />
            <ExperienceUpgradesCard
              text="Race prizes"
              value={experienceRace.prizes}
              max={3}
              onClick={() => buyBuff('race', 'prizes')}
              innerTextArray={['+0%', '+10%', '+20%', '+30%']}
              bg={colors.green}
              availablePoints={availablePointsObject.availablePoints}
            />
          </>
        )}

        {expType === 'mechanic' && (
          <>
            <ExperienceUpgradesCard
              text="ACC price"
              value={experienceMechanic.acc}
              max={3}
              onClick={() => buyBuff('mechanic', 'acc')}
              innerTextArray={['-0%', '-10%', '-20%']}
              bg={colors.lightBlue}
              availablePoints={availablePointsObject.availablePoints}
            />
            <ExperienceUpgradesCard
              text="SPD price"
              value={experienceMechanic.spd}
              max={3}
              onClick={() => buyBuff('mechanic', 'spd')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.lightBlue}
              availablePoints={availablePointsObject.availablePoints}
            />
            <ExperienceUpgradesCard
              text="HND price"
              value={experienceMechanic.hnd}
              max={3}
              onClick={() => buyBuff('mechanic', 'hnd')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.lightBlue}
              availablePoints={availablePointsObject.availablePoints}
            />
          </>
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
