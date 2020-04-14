import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/core';
import AttributeInfo from './AttributeInfo';
import CardProgressOverlay from './CardProgressOverlay';
import { useDispatch } from 'react-redux';
import { ATTRIBUTE_TYPES } from '../helpers/utils';
import { sellCarAction, upgradeAttributeAction } from '../state/actions';

const AttributeUpgrade = ({
  id,
  name,
  value,
  upgradeValue,
  upgrade,
  max,
  price,
  type,
}) => {
  const dispatch = useDispatch();

  const onClickUpgrade = () => {
    dispatch(upgradeAttributeAction(type, id));
  };

  return (
    <Flex position="relative" h="2rem">
      <AttributeInfo flexGrow="1" name={name} upgrade={upgrade} max={max} />
      <Flex
        w="100%"
        textAlign="center"
        position="absolute"
        fontSize="sm"
        justifyContent="center"
      >
        <Text textAlign="center" fontSize="sm">
          {value}
        </Text>
        <Text
          textAlign="center"
          fontSize="sm"
          marginLeft="0.2rem"
          marginRight="0.2rem"
        >
          ->
        </Text>
        <Text textAlign="center" fontSize="sm" fontWeight="bold" color="tomato">
          {upgradeValue}
        </Text>
      </Flex>
      <Button
        w="4rem"
        h="1.5rem"
        borderColor="tomato"
        color="tomato"
        variant="outline"
        isDisabled={!price}
        onClick={onClickUpgrade}
      >
        ${price}
      </Button>
    </Flex>
  );
};

const CarDetails = ({
  id,
  name,
  type,
  image,
  acceleration,
  topSpeed,
  handling,
  price,
}) => {
  const racing = false;
  const dispatch = useDispatch();

  const sell = () => {
    dispatch(sellCarAction(id));
  };

  return (
    <Box position="relative" w="16rem">
      {racing && (
        <CardProgressOverlay
          timeTotal={10}
          timeLeft={9}
          label="Race 1"
          zIndex="1"
        />
      )}
      <Box marginTop="0.6rem" padding="0 0.2rem 0.6rem">
        <Image w="100%" h="8rem" alt="car" bg="lightgray" />
        <Text textAlign="center" w="100%" fontSize="md" src={image}>
          {name}
        </Text>
        <Text textAlign="left" w="100%" fontSize="sm">
          Type: {type}
        </Text>
        <AttributeUpgrade
          id={id}
          name="Acceleration"
          type={ATTRIBUTE_TYPES.ACCELERATION}
          value={acceleration.value}
          upgradeValue={acceleration.upgradeValue}
          upgrade={acceleration.upgrade}
          max={acceleration.max}
          price={acceleration.price}
        />
        <AttributeUpgrade
          id={id}
          name="Top Speed"
          type={ATTRIBUTE_TYPES.TOP_SPEED}
          value={topSpeed.value}
          upgradeValue={topSpeed.upgradeValue}
          upgrade={topSpeed.upgrade}
          max={topSpeed.max}
          price={topSpeed.price}
        />
        <AttributeUpgrade
          id={id}
          name="Handling"
          type={ATTRIBUTE_TYPES.HANDLING}
          value={handling.value}
          upgradeValue={handling.upgradeValue}
          upgrade={handling.upgrade}
          max={handling.max}
          price={handling.price}
        />
        <Flex>
          <Button
            variantColor="teal"
            variant="outline"
            margin="1rem auto"
            onClick={sell}
          >
            Sell (${price})
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

CarDetails.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {},
};

export default CarDetails;
