import React from 'react';
import { useLocation } from 'react-router-dom';
import { dealerCarsSelector } from '../state/selectors';
import { useSelector } from 'react-redux';
import CardBig from './CardBig';
import { capitalize } from '../helpers/utils';
import { brandSponsors } from '../helpers/sponsors';
import { colors } from '../helpers/theme';
import { useCarsAcquired } from '../helpers/hooksDealer';
import CarImage from './CarImage';
import { useHistoryHelper } from '../helpers/hooks';

const CardDealer = ({ brandType, brandName, ...props }) => {
  const location = useLocation();
  const history = useHistoryHelper();
  const cars = useSelector(dealerCarsSelector);

  const allBrandCars = cars.filter(item => item.brand === brandType);
  const brandCars = allBrandCars.slice(0, 9);

  const carsAcquired = useCarsAcquired(allBrandCars);
  const allCarsAcquired = carsAcquired === brandCars.length;

  const divider = ~~((brandCars.length - 1) / 3 + 1);

  const columns =
    (brandCars.length > 2 && 3) || (brandCars.length > 1 && 2) || 1;

  const onClick = () => {
    history.push(location.pathname + '/' + brandType);
  };

  const primaryBg =
    (allCarsAcquired && colors.orange) ||
    (carsAcquired > 0 && colors.darkGray) ||
    colors.lightGray;

  const primaryColor =
    (allCarsAcquired && 'black') ||
    (carsAcquired > 0 && colors.white) ||
    'black';

  return (
    <CardBig
      onClick={onClick}
      primaryText={capitalize(brandName)}
      secondaryText={
        allCarsAcquired
          ? `Sponsor: $${~~brandSponsors[brandType]}/s`
          : '(No sponsor)'
      }
      theme={{
        primaryBg: primaryBg,
        secondaryBg: colors.lightGray,
        primaryColor: primaryColor,
      }}
      {...props}
    >
      {brandCars.map(car => (
        <CarImage
          w={`${100 / columns}%`}
          h={`${~~(100 / divider)}%`}
          car={car}
          key={car.id}
        />
      ))}
    </CardBig>
  );
};

export default CardDealer;
