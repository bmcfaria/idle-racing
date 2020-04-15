import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import ContentPanel from './ContentPanel';
import CardCard from './CardCar';
import CarDetails from './CarDetails';
import { displayResponsivePanel } from '../helpers/utils';
import { useSelector } from 'react-redux';
import { garageCarsSelector } from '../state/selectors';

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const Separator = props => <Box w="1rem" {...props} />;

const Garage = () => {
  const location = useLocation();
  const cars = useSelector(garageCarsSelector);

  const selected = location?.state?.car;

  const selectedCar = cars.find(item => item.id === selected);

  return (
    <Flex justifyContent="center">
      <ContentPanel
        title="Select Car"
        display={displayResponsivePanel(selectedCar)}
      >
        {cars.length === 0 && <div>No cars owned</div>}

        {cars.map((car, index) => (
          <React.Fragment key={car.id}>
            {index > 0 && <Divider />}
            <CardCard car={car} />
          </React.Fragment>
        ))}
      </ContentPanel>
      {selectedCar && (
        <Separator display={displayResponsivePanel(selectedCar)} />
      )}
      {selectedCar && (
        <ContentPanel title="Car Details" wrap>
          <CarDetails
            id={selectedCar.id}
            name={selectedCar.name}
            type={selectedCar.type}
            image={selectedCar.image}
            acceleration={selectedCar.acceleration}
            topSpeed={selectedCar.topSpeed}
            handling={selectedCar.handling}
            price={selectedCar.price}
          />
        </ContentPanel>
      )}
    </Flex>
  );
};

export default Garage;
