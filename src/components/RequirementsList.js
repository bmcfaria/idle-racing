import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { getImageCar } from '../helpers/imageMapping';
import { useSelector } from 'react-redux';
import { dealerCarSelector, garageCarsSelector } from '../state/selectors';
import { colors } from '../helpers/theme';

const RequirementsListNoUps = () => {
  const garagesCars = useSelector(garageCarsSelector);

  const carWithNoUpgrades = garagesCars.find(
    item =>
      item.acc.upgrade === 0 && item.tsp.upgrade === 0 && item.hnd.upgrade === 0
  );

  return (
    <Text
      h="16px"
      fontSize="12px"
      color={!!carWithNoUpgrades ? 'unset' : colors.red}
    >
      no-ups
    </Text>
  );
};

const RequirementsListBrand = ({ brand }) => {
  const garagesCars = useSelector(garageCarsSelector);

  const carFromBrand = garagesCars.find(item => item.brand === brand);

  return (
    <Text
      h="16px"
      fontSize="12px"
      color={!!carFromBrand ? 'unset' : colors.red}
    >
      {brand}
    </Text>
  );
};

const RequirementsListCar = ({ carId }) => {
  const car = useSelector(dealerCarSelector(carId));

  return (
    <Image
      maxW="24px"
      h="16px"
      objectFit="contain"
      alt="car"
      src={getImageCar(car)}
    />
  );
};

const RequirementsList = ({ requirements, ...props }) => (
  <Flex justifyContent="space-around" {...props}>
    {requirements.map((requirement, index) => (
      <React.Fragment key={`${requirement.type}_${index}`}>
        {requirement.type === 'no_ups' && <RequirementsListNoUps />}
        {requirement.type === 'brand' && (
          <RequirementsListBrand brand={requirement.value} />
        )}
        {requirement.type === 'car' && (
          <RequirementsListCar carId={requirement.value} />
        )}
      </React.Fragment>
    ))}
  </Flex>
);

export default RequirementsList;
