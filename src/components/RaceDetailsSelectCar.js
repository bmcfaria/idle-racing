import React, { useContext, useState } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Button from './Button';
import { colors } from '../helpers/theme';
import { RaceContext } from '../helpers/context';
import { capitalize } from '../helpers/utils';
import { dealerCarSelector } from '../state/selectors';
import { useSelector } from 'react-redux';

const SelectCarContainer = styled(Flex)`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const RequirementNoUps = () => <Text>No upgrades</Text>;

const RequirementBrand = ({ brand }) => <Text>{capitalize(brand)} cars</Text>;

const RequirementType = ({ type }) => {
  const typeText = {
    rwd: 'Rear-wheel-drive',
    fwd: 'Front-wheel-drive',
    '4x4': '4x4',
  }[type];

  return <Text>{typeText} only</Text>;
};

const RequirementCar = ({ carId }) => {
  const car = useSelector(dealerCarSelector(carId));

  return <Text>"{capitalize(car?.name)}" car</Text>;
};

const RequirementAttr = ({ attr }) => {
  const compare = {
    lt: '<',
    eq: '=',
    gt: '>',
  };

  return (
    <Text>{`Cars with ${attr.attr.toUpperCase()} ${compare[attr.compare]} ${
      attr.value
    }`}</Text>
  );
};

const RaceDetailsSelectCar = ({ onClick, ...props }) => {
  const { requirements } = useContext(RaceContext);
  const [hover, setHover] = useState(false);

  return (
    <SelectCarContainer
      w="100%"
      h="100%"
      borderRadius="0 16px 16px 0"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      direction="column"
      alignItems="center"
      {...props}
    >
      <Flex
        w="100%"
        h="74px"
        color={colors.white}
        textAlign="center"
        fontSize="14px"
        direction="column"
        justifyContent="center"
      >
        {requirements.map((requirement, index) => (
          <React.Fragment key={index}>
            {requirement.type === 'no_ups' && <RequirementNoUps />}
            {requirement.type === 'brand' && (
              <RequirementBrand brand={requirement.value} />
            )}
            {requirement.type === 'type' && (
              <RequirementType type={requirement.value} />
            )}
            {requirement.type === 'attr' && (
              <RequirementAttr attr={requirement.value} />
            )}
            {requirement.type === 'car' && (
              <RequirementCar carId={requirement.value} />
            )}
          </React.Fragment>
        ))}
      </Flex>
      <Button
        bg={colors.white}
        colors={colors.darkGray}
        _active={{
          boxShadow: 'none',
          border: `4px solid ${colors.purple}`,
        }}
        isActive={hover}
      >
        Select car
      </Button>
    </SelectCarContainer>
  );
};

export default RaceDetailsSelectCar;
