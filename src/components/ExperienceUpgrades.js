import React from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  experienceBusinessSelector,
  experienceRaceSelector,
  experienceMechanicSelector,
} from '../state/selectors';
import { colors } from '../helpers/theme';
import { buyExperienceBuffAction } from '../state/actions';
import ExperienceUpgradesColumnBuffs from './ExperienceUpgradesColumnBuffs';

const ExperienceUpgrades = ({ expType }) => {
  const dispatch = useDispatch();
  const experienceBusiness = useSelector(experienceBusinessSelector);
  const experienceRace = useSelector(experienceRaceSelector);
  const experienceMechanic = useSelector(experienceMechanicSelector);

  const availablePointsObject =
    (expType === 'business' && experienceBusiness) ||
    (expType === 'race' && experienceRace) ||
    (expType === 'mechanic' && experienceMechanic) ||
    {};

  const colorBought =
    (expType === 'business' && colors.orange) ||
    (expType === 'race' && colors.green) ||
    (expType === 'mechanic' && colors.lightBlue) ||
    'white';

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
      <Flex w="100%" justifyContent="space-between" lineHeight="16px">
        {expType === 'business' && (
          <>
            <Text w="48px" marginLeft="-4px" textAlign="center">
              New cars
            </Text>
            <Text w="48px" marginRight="-4px" textAlign="center">
              Used cars
            </Text>
          </>
        )}
        {expType === 'race' && (
          <>
            <Text w="48px" marginLeft="-4px" textAlign="center">
              Race price
            </Text>
            <Text w="48px" marginRight="-4px" textAlign="center">
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
        {expType === 'business' && (
          <>
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              experience={experienceBusiness.newCars}
              buyBuff={() => buyBuff('business', 'newCars')}
            />
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              experience={experienceBusiness.usedCars}
              buyBuff={() => buyBuff('business', 'usedCars')}
              valueText="+10%"
            />
          </>
        )}
        {expType === 'race' && (
          <>
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              experience={experienceRace.price}
              buyBuff={() => buyBuff('race', 'price')}
            />
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              experience={experienceRace.prizes}
              buyBuff={() => buyBuff('race', 'prizes')}
              valueText="+10%"
            />
          </>
        )}
        {expType === 'mechanic' && (
          <>
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              text="Acc"
              experience={experienceMechanic.acc}
              buyBuff={() => buyBuff('mechanic', 'acc')}
            />
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              text="Spd"
              experience={experienceMechanic.spd}
              buyBuff={() => buyBuff('mechanic', 'spd')}
            />
            <ExperienceUpgradesColumnBuffs
              colorBought={colorBought}
              text="Hnd"
              experience={experienceMechanic.hnd}
              buyBuff={() => buyBuff('mechanic', 'hnd')}
            />
          </>
        )}
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
