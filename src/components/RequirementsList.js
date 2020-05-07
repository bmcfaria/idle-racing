import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { getImage } from '../helpers/imageMapping';
import { useSelector } from 'react-redux';
import { dealerCarSelector, garageCarsSelector } from '../state/selectors';
import { capitalize } from '../helpers/utils';

const RequirementsListNoUps = () => {
  const garagesCars = useSelector(garageCarsSelector);

  const carWithNoUpgrades = garagesCars.find(
    item =>
      item.acc.upgrade === 0 && item.tsp.upgrade === 0 && item.hnd.upgrade === 0
  );

  return (
    <Text
      textAlign="left"
      w="100%"
      h="16px"
      fontSize="12px"
      color={!!carWithNoUpgrades ? 'unset' : 'tomato'}
    >
      - No Upgrades
    </Text>
  );
};

const RequirementsListBrand = ({ brand }) => {
  const garagesCars = useSelector(garageCarsSelector);

  const carFromBrand = garagesCars.find(item => item.brand === brand);

  return (
    <Text
      textAlign="left"
      w="100%"
      h="16px"
      fontSize="12px"
      color={!!carFromBrand ? 'unset' : 'tomato'}
    >
      - {capitalize(brand)} cars only
    </Text>
  );
};

const RequirementsListCar = ({ carId }) => {
  const car = useSelector(dealerCarSelector(carId));
  const garagesCars = useSelector(garageCarsSelector);

  const carOwned = garagesCars.find(item => item.dealerCar === carId);

  return (
    <Flex h="16px">
      <Text textAlign="left" h="16px" fontSize="12px">
        -
      </Text>
      <Image
        w="24px"
        alt="car"
        margin="auto 4px"
        objectFit="contain"
        style={{ imageRendering: 'pixelated' }}
        src={getImage(car)}
      />
      <Text
        textAlign="left"
        fontSize="12px"
        color={carOwned ? 'unset' : 'tomato'}
      >
        {car.name}
      </Text>
    </Flex>
  );
};

const RequirementsList = ({ requirements }) => (
  <>
    {requirements.length === 0 && (
      <Text textAlign="left" w="100%" h="16px" fontSize="12px">
        - None
      </Text>
    )}
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
  </>
);

export default RequirementsList;
