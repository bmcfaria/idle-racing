import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/core";
import AttributesBar from "./AttributesBar";
import { useDispatch, useSelector } from 'react-redux';
import { buyCarAction } from '../state/actions';
import { moneySelector } from '../state/selectors';

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
)

const Attribute = ({
  name,
  value,
  upgradeValue,
  upgrade,
  max
}) => (
    <Flex position="relative" h="1rem" justifyContent="space-between">
      <Text textAlign="center" fontSize="sm">
        {name}
      </Text>
      <Box position="absolute" w="100%">
        <AttributesBar upgrade={upgrade} max={max} w="4rem" margin="0.5rem auto" />
      </Box>
      <Text textAlign="center" fontSize="sm">
        {value}
      </Text>
    </Flex>
  );

const CarDetails = ({
  id,
  name,
  type,
  image,
  acceleration,
  topSpeed,
  handling,
  price
}) => {
  const dispatch = useDispatch();
  const money = useSelector(moneySelector);
  const enoughMoney = money >= price;

  const buy = () => {
    dispatch(buyCarAction(id))
  }

  return (
    <Box position="relative" w="16rem">
      <Box marginTop="0.6rem" padding="0 0.2rem 0.6rem">
        <Image w="100%" h="8rem" alt="car" bg="lightgray" src={image} />
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
          value={acceleration.value}
          upgradeValue={acceleration.upgradeValue}
          upgrade={acceleration.upgrade}
          max={acceleration.max}
          price={acceleration.price}
        />
        <Attribute
          name="Top Speed"
          value={topSpeed.value}
          upgradeValue={topSpeed.upgradeValue}
          upgrade={topSpeed.upgrade}
          max={topSpeed.max}
          price={topSpeed.price}
        />
        <Attribute
          name="Handling"
          value={handling.value}
          upgradeValue={handling.upgradeValue}
          upgrade={handling.upgrade}
          max={handling.max}
          price={handling.price}
        />
        <Text fontSize="md" marginTop="1rem">
          {`Price: $${price}`}
        </Text>
        <Flex>
          <Button
            variantColor="tomato"
            variant="outline"
            margin="0 auto"
            onClick={buy}
            isDisabled={!enoughMoney}
          >
            Buy
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

CarDetails.defaultProps = {
  acceleration: {},
  topSpeed: {},
  handling: {}
};

export default CarDetails;
