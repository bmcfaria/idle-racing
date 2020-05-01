import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/core';
import AttributesBar from './AttributesBar';
import { useDispatch, useSelector } from 'react-redux';
import { buyCarAction } from '../state/actions';
import { moneySelector } from '../state/selectors';
import { useHistory } from 'react-router-dom';
import { getImage } from '../helpers/imageMapping';

const AttributeLabel = () => (
  <Flex position="relative" justifyContent="space-between">
    <Text textAlign="center" fontSize="sm">
      Property
    </Text>
    <Text w="100%" textAlign="center" fontSize="sm" position="absolute">
      Upgrade slots
    </Text>
    <Text textAlign="center" fontSize="sm">
      Base value
    </Text>
  </Flex>
);

const Attribute = ({ name, value, upgradeValue, upgrade, max }) => (
  <Flex position="relative" h="1rem" justifyContent="space-between">
    <Text textAlign="center" fontSize="sm">
      {name}
    </Text>
    <Box position="absolute" w="100%">
      <AttributesBar
        upgrade={upgrade}
        max={max}
        w="4rem"
        margin="0.5rem auto"
      />
    </Box>
    <Text textAlign="center" fontSize="sm">
      {value}
    </Text>
  </Flex>
);

const CarDealerDetails = ({ car, ...props }) => {
  const { id, name, type, acc, tsp, hnd, price } = car;

  const dispatch = useDispatch();
  const history = useHistory();
  const money = useSelector(moneySelector);
  const enoughMoney = money >= price;

  const buy = () => {
    dispatch(buyCarAction(id));
    history.goBack();
  };

  return (
    <Box
      position="relative"
      w="16rem"
      bg="white"
      borderRadius="16px"
      {...props}
    >
      <Box marginTop="0.6rem" padding="0 0.2rem 0.6rem">
        <Image
          w="100%"
          h="8rem"
          alt="car"
          // bg="lightgray"
          objectFit="contain"
          style={{ imageRendering: 'pixelated' }}
          src={getImage(car)}
        />
        <Text textAlign="center" w="100%" fontSize="md">
          {name}
        </Text>
        <Text textAlign="left" w="100%" fontSize="sm">
          Type: {type}
        </Text>
        <Text textAlign="center" w="100%" fontSize="sm">
          Specs
        </Text>
        <AttributeLabel />
        <Attribute
          name="Acceleration"
          value={acc.value}
          upgradeValue={acc.upgradeValue}
          upgrade={acc.upgrade}
          max={acc.max}
          price={acc.price}
        />
        <Attribute
          name="Top Speed"
          value={tsp.value}
          upgradeValue={tsp.upgradeValue}
          upgrade={tsp.upgrade}
          max={tsp.max}
          price={tsp.price}
        />
        <Attribute
          name="Handling"
          value={hnd.value}
          upgradeValue={hnd.upgradeValue}
          upgrade={hnd.upgrade}
          max={hnd.max}
          price={hnd.price}
        />
        <Flex>
          <Button
            variantColor="tomato"
            variant="outline"
            margin="0 auto"
            onClick={buy}
            isDisabled={!enoughMoney}
            marginTop="1rem"
          >
            {`$${price}`}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CarDealerDetails;
