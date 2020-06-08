import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { dealerCarSelector, garageCarsSelector } from '../state/selectors';
import { colors } from '../helpers/theme';
import { validateAttrRequirements } from '../helpers/utils';

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

const RequirementsListType = ({ type }) => {
  const garagesCars = useSelector(garageCarsSelector);

  const carFromType = garagesCars.find(item => item.type === type);

  return (
    <Text h="16px" fontSize="12px" color={!!carFromType ? 'unset' : colors.red}>
      {type}
    </Text>
  );
};

const RequirementsListAttr = ({ attr, requirements }) => {
  const garagesCars = useSelector(garageCarsSelector);

  const meetRequirement = garagesCars.reduce(
    (result, car) => result && validateAttrRequirements(car, requirements),
    true
  );

  const compare = {
    lt: '<',
    eq: '=',
    gt: '>',
  };

  return (
    <Text
      h="16px"
      fontSize="12px"
      color={!!meetRequirement ? 'unset' : colors.red}
    >
      {`${attr.attr.toUpperCase()} ${compare[attr.compare]} ${attr.value}`}
    </Text>
  );
};

const RequirementsListCar = ({ carId }) => {
  const garagesCars = useSelector(garageCarsSelector);
  const car = useSelector(dealerCarSelector(carId));

  const meetRequirement = garagesCars.find(
    garageCar => garageCar.dealerCar === car.id,
    true
  );

  return (
    <Text
      h="16px"
      fontSize="12px"
      color={!!meetRequirement ? 'unset' : colors.red}
    >
      {car.name.split(' ').pop()}
    </Text>
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
        {requirement.type === 'type' && (
          <RequirementsListType type={requirement.value} />
        )}
        {requirement.type === 'attr' && (
          <RequirementsListAttr
            attr={requirement.value}
            requirements={requirements}
          />
        )}
        {requirement.type === 'car' && (
          <RequirementsListCar carId={requirement.value} />
        )}
      </React.Fragment>
    ))}
  </Flex>
);

export default RequirementsList;
