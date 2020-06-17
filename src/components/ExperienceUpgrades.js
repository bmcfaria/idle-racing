import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  raceSelector,
  garageCarSelector,
  pastRaceSelector,
  experienceSelector,
  experienceBusinessSelector,
  experienceRaceSelector,
  experienceMechanicSelector,
} from '../state/selectors';
import CardProgressOverlay from './CardProgressOverlay';
import CardTrackContent from './CardTrackContent';
import { colors } from '../helpers/theme';
import hexAlpha from 'hex-alpha';
import Button from './Button';
import { buyExperienceBuffAction } from '../state/actions';

const ExperienceUpgrade = ({ text, status, onClick, ...props }) => (
  <Box w="40px" h="40px" {...props}>
    <Button
      w="40px"
      h="40px"
      border="1px solid black"
      padding="0"
      bg={
        (status < 0 && colors.lightBlue) ||
        (status > 0 && colors.darkGray) ||
        colors.white
      }
      isDisabled={status !== 0}
      onClick={onClick}
    >
      <Box>
        {text && (
          <Text h="20px" lineHeight="20px">
            {text}
          </Text>
        )}
        <Text h="20px" lineHeight="20px">
          -10%
        </Text>
      </Box>
    </Button>
  </Box>
);

const ColumnMechanic = ({ text, experience, buyBuff }) => (
  <Box>
    <ExperienceUpgrade text={text} status={0 - experience} onClick={buyBuff} />
    <ExperienceUpgrade
      text={text}
      marginTop="12px"
      status={1 - experience}
      onClick={buyBuff}
    />
    <ExperienceUpgrade
      text={text}
      marginTop="12px"
      status={2 - experience}
      onClick={buyBuff}
    />
  </Box>
);

const ExperienceUpgrades = ({ expType }) => {
  const dispatch = useDispatch();
  const experienceObject = useSelector(experienceSelector);
  const experienceBusiness = useSelector(experienceBusinessSelector);
  const experienceRace = useSelector(experienceRaceSelector);
  const experienceMechanic = useSelector(experienceMechanicSelector);

  console.log(expType);
  const availablePointsObject =
    (expType === 'business' && experienceBusiness) ||
    (expType === 'race' && experienceRace) ||
    (expType === 'mechanic' && experienceMechanic) ||
    {};

  console.log(availablePointsObject);

  const buyBuff = (type, subType) => {
    dispatch(buyExperienceBuffAction(type, subType));
  };

  return (
    <Flex
      direction="column"
      borderRadius="16px"
      padding="24px"
      bg={colors.white}
      alignItems="center"
    >
      <Flex w="100%" justifyContent="space-around" lineHeight="16px">
        {expType === 'business' && (
          <>
            <Text w="48px" textAlign="center">
              New cars
            </Text>
            <Text w="48px" textAlign="center">
              Used cars
            </Text>
          </>
        )}
        {expType === 'race' && (
          <>
            <Text w="48px" textAlign="center">
              Race price
            </Text>
            <Text w="48px" textAlign="center">
              Race prizes
            </Text>
          </>
        )}
        {expType === 'mechanic' && (
          <Text w="100%" textAlign="center">
            Discount on upgrades
          </Text>
        )}
      </Flex>
      <Flex
        w={`${40 * 3 + 12 * 2}px`}
        marginTop="16px"
        justifyContent="space-between"
      >
        <ColumnMechanic
          text="Acc"
          experience={experienceMechanic.acc}
          buyBuff={() => buyBuff('mechanic', 'acc')}
        />
        <ColumnMechanic
          text="Spd"
          experience={experienceMechanic.spd}
          buyBuff={() => buyBuff('mechanic', 'spd')}
        />
        <ColumnMechanic
          text="Hnd"
          experience={experienceMechanic.hnd}
          buyBuff={() => buyBuff('mechanic', 'hnd')}
        />
      </Flex>
      <Text
        w="100%"
        marginTop="16px"
        textAlign="center"
      >{`Available points: ${availablePointsObject.availablePoints}`}</Text>
    </Flex>
  );
};

export default ExperienceUpgrades;
