import React from 'react';
import { Text, Flex, Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { dealerCarsSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../helpers/theme';
import getImageCar from '../helpers/imageMappingCars';
import Button from './Button';

const CardDealer = ({ brandType, brandName, ...props }) => {
  const location = useLocation();
  const history = useHistory();
  const cars = useSelector(dealerCarsSelector);

  const brandCars = cars.filter(item => item.brand === brandType).slice(0, 9);

  const divider = ~~((brandCars.length - 1) / 3 + 1);

  const columns =
    (brandCars.length > 2 && 3) || (brandCars.length > 1 && 2) || 1;

  const onClick = () => {
    history.push(location.pathname + '/' + brandType);
  };

  return (
    <Button
      w="320px"
      h="auto"
      position="relative"
      onClick={onClick}
      cursor="pointer"
      borderRadius="16px"
      bg={colors.orange}
      flexDirection="column"
      {...props}
    >
      <Flex
        w="318px"
        marginTop="1px"
        bg={colors.lightGray}
        borderRadius="16px"
        direction="column"
        alignItems="center"
      >
        <Flex
          w="316px"
          padding="0 8px"
          h="120px"
          marginTop="1px"
          bg={colors.white}
          borderRadius="16px"
          flexWrap="wrap"
        >
          {brandCars.map(car => (
            <Image
              w={`${100 / columns}%`}
              h={`${~~(100 / divider)}%`}
              alt="car"
              borderRadius="16px"
              objectFit="contain"
              bg={colors.white}
              src={getImageCar(car)}
              key={car.id}
            />
          ))}
        </Flex>
        <Text h="20px" lineHeight="20px" fontSize="14px" textAlign="center">
          Sponsor: $100 / second
        </Text>
      </Flex>
      <Text h="32px" lineHeight="32px" fontSize="18px" textAlign="center">
        {brandName}
      </Text>
    </Button>
  );
};

export default CardDealer;
