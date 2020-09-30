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
import Button from './Button';
import UpgradableCircle from './UpgradableCircle';

const CardUpgrade = ({
  text,
  base = 0,
  value = 0,
  max = 1,
  onClick,
  innerTextArray = [],
  ...props
}) => {
  const [hoverOnAttr, setHoverOnAttr] = useState();
  const clickable = value < max;
  const showNext = clickable && hoverOnAttr;

  return (
    <Button
      w="80px"
      h="104px"
      margin="0 auto"
      padding="8px"
      border={`1px solid ${colors.darkGray}`}
      whiteSpace="normal"
      flexDirection="column"
      justifyContent="space-between"
      onMouseEnter={() => clickable && setHoverOnAttr(true)}
      onMouseLeave={() => setHoverOnAttr()}
      {...(clickable && { onClick: onClick })}
      {...(!clickable && { cursor: 'auto', boxShadow: 'none' })}
      {...props}
    >
      <Text textAlign="center">{text}</Text>
      <UpgradableCircle
        base={base}
        value={value}
        max={max}
        showNextUpgradeValue={showNext}
      >
        {innerTextArray.length > 0 && (
          <Flex margin="auto" alignItems="center">
            <Text fontSize="14px" lineHeight="14px">
              {showNext ? innerTextArray?.[value + 1] : innerTextArray?.[value]}
            </Text>
          </Flex>
        )}
      </UpgradableCircle>
    </Button>
  );
};

const ExperienceUpgrades = ({ expType, ...props }) => {
  const dispatch = useDispatch();
  const experienceBusiness = useExperienceBusiness();
  const experienceRace = useExperienceRace();
  const experienceMechanic = useExperienceMechanic();

  const availablePointsObject =
    (expType === 'business' && experienceBusiness) ||
    (expType === 'race' && experienceRace) ||
    (expType === 'mechanic' && experienceMechanic) ||
    {};

  const buyBuff = (type, subType) => {
    dispatch(buyExperienceBuffAction(type, subType));
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
            <CardUpgrade
              text="New cars price"
              value={experienceBusiness.newCars}
              max={3}
              onClick={() => buyBuff('business', 'newCars')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.orange}
            />
            <CardUpgrade
              text="Old cars price"
              value={experienceBusiness.usedCars}
              max={3}
              onClick={() => buyBuff('business', 'usedCars')}
              innerTextArray={['+0%', '+10%', '+20%', '+30%']}
              bg={colors.orange}
            />
          </>
        )}

        {expType === 'race' && (
          <>
            <CardUpgrade
              text="Race price"
              value={experienceRace.price}
              max={3}
              onClick={() => buyBuff('race', 'price')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.green}
            />
            <CardUpgrade
              text="Race prizes"
              value={experienceRace.prizes}
              max={3}
              onClick={() => buyBuff('race', 'prizes')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.green}
            />
          </>
        )}

        {expType === 'mechanic' && (
          <>
            <CardUpgrade
              text="ACC price"
              value={experienceMechanic.acc}
              max={3}
              onClick={() => buyBuff('mechanic', 'acc')}
              innerTextArray={['-0%', '-10%', '-20%']}
              bg={colors.lightBlue}
            />
            <CardUpgrade
              text="SPD price"
              value={experienceMechanic.spd}
              max={3}
              onClick={() => buyBuff('mechanic', 'spd')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.lightBlue}
            />
            <CardUpgrade
              text="HND price"
              value={experienceMechanic.hnd}
              max={3}
              onClick={() => buyBuff('mechanic', 'hnd')}
              innerTextArray={['-0%', '-10%', '-20%', '-30%']}
              bg={colors.lightBlue}
            />
          </>
        )}
      </Box>
      <Text
        w="100%"
        marginTop="16px"
        textAlign="center"
      >{`Available points: ${availablePointsObject.availablePoints}`}</Text>
    </Flex>
  );
};

export default ExperienceUpgrades;
