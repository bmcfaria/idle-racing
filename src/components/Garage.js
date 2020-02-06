import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { useLocation } from "react-router-dom";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";
import CarDetails from "./CarDetails";

const generateRandomAttribute = (base, unit, max, basePrice) => {
  const upgrade = Math.round(Math.random() * max);
  const value = base + unit * upgrade;
  const nextValue = base + unit * (upgrade + 1);
  const price = basePrice + Math.pow(basePrice * 0.1, upgrade);

  return {
    value: value,
    upgradeValue: upgrade < max ? nextValue : value,
    upgrade: upgrade,
    max: max,
    price: upgrade < max ? price : undefined,
    priceRaw: price
  };
};

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

class Car {
  image = undefined;

  constructor(id, name = "Porsche 911 Carrera", type = "4x4") {
    this.id = id;
    this.name = name;
    this.type = type;

    this.acceleration = generateRandomAttribute(100, 20, 5, 50);
    this.topSpeed = generateRandomAttribute(100, 20, 5, 50);
    this.handling = generateRandomAttribute(100, 20, 5, 50);

    this.price =
      500 +
      (this.acceleration.price || this.acceleration.priceRaw) +
      (this.topSpeed.price || this.topSpeed.priceRaw) +
      (this.handling.price || this.handling.priceRaw);
  }
}

//TODO: change: Mock values
const cars = [...new Array(20)].map((_, index) => new Car(index + 1));

const Separator = props => <Box w="1rem" {...props} />;

const Garage = () => {
  const location = useLocation();
  console.log(location);

  const selected = location?.state?.car;

  //TODO: change: simple selector, only for mocked data
  const selectedCar = cars[selected - 1];

  return (
    <Flex justifyContent="center">
      <ContentPanel
        title="Select Car"
        display={[
          selectedCar ? "none" : "flex",
          selectedCar ? "none" : "flex",
          "flex"
        ]}
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
        <Separator
          display={[
            selectedCar ? "none" : "flex",
            selectedCar ? "none" : "flex",
            "flex"
          ]}
        />
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
