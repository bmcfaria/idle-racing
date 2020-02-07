import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { useLocation } from "react-router-dom";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";
import CarDetails from "./CarDetails";
import { cars } from "../helpers/mockData";
import { displayResponsivePanel } from "../helpers/utils";

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const Separator = props => <Box w="1rem" {...props} />;

const Garage = () => {
  const location = useLocation();

  const selected = location?.state?.car;

  //TODO: change: simple selector, only for mocked data
  const selectedCar = cars[selected - 1];

  return (
    <Flex justifyContent="center">
      <ContentPanel
        title="Select Car"
        display={displayResponsivePanel(selectedCar)}
      >
        {cars.map((car, index) => (
          <React.Fragment key={car.id}>
            {index > 0 && <Divider />}
            <CardCard
              id={car.id}
              name={car.name}
              type={car.type}
              image={car.image}
              acceleration={car.acceleration}
              topSpeed={car.topSpeed}
              handling={car.handling}
            />
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
