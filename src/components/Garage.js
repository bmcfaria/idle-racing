import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";
import CarDetails from "./CarDetails";
import { CardCarContext } from "../context";

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

const Garage = () => {
  const [selected, setSelected] = useState(0);

  //TODO: change: simple selector, only for mocked data
  const selectedCar = cars[selected - 1];

  return (
    <CardCarContext.Provider value={{ selected, setSelected }}>
      <Flex justifyContent="center">
        <ContentPanel title="Select Car">
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
          <ContentPanel title="Car Details" separator wrap>
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
    </CardCarContext.Provider>
  );
};

export default Garage;
