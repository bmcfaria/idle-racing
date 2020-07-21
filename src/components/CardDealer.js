import React from 'react';
import { Image } from '@chakra-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { dealerCarsSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import getImageCar from '../helpers/imageMappingCars';
import CardBig from './CardBig';

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
    <CardBig
      onClick={onClick}
      primaryText={brandName}
      secondaryText={'Sponsor: $0 / second'}
      {...props}
    >
      {brandCars.map(car => (
        <Image
          w={`${100 / columns}%`}
          h={`${~~(100 / divider)}%`}
          alt="car"
          borderRadius="16px"
          objectFit="contain"
          src={getImageCar(car)}
          key={car.id}
        />
      ))}
    </CardBig>
  );
};

export default CardDealer;
