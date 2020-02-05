import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";
import CarDetails from "./CarDetails";

const CardExample = () => <Box h="2rem" bg="tomato" margin="0.2rem"></Box>;

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

class Car {
  price = 599;
  image = undefined;

  constructor(id, name = "Porsche 911 Carrera", type = "4x4") {
    this.id = id;
    this.name = name;
    this.type = type;
    this.acceleration = {
      value: 180,
      upgradeValue: 200,
      upgrade: 1 + Math.round(Math.random()),
      max: 5
    };
    this.topSpeed = {
      value: 200,
      upgradeValue: 220,
      upgrade: 3,
      max: 5
    };
    this.handling = {
      value: 220,
      upgradeValue: 240,
      upgrade: 4,
      max: 5
    };
  }
}

const cars = [...new Array(20)].map((_, index) => new Car(index));

const Garage = () => (
  <Flex justifyContent="center">
    <ContentPanel title="Select Car">
      {cars.map((car, index) => (
        <React.Fragment key={car.id}>
          {index > 0 && <Divider />}
          <CardCard
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
    <ContentPanel title="Car Details" separator wrap>
      <CarDetails />
    </ContentPanel>
  </Flex>
);

export default Garage;
