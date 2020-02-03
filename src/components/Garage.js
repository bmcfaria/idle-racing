import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";
import CarDetails from "./CarDetails";

const CardExample = () => <Box h="2rem" bg="tomato" margin="0.2rem"></Box>;

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const cars = [...new Array(20)];

const Garage = () => (
  <Flex justifyContent="center">
    <ContentPanel title="Select Car">
      {cars.map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <CardCard />
        </React.Fragment>
      ))}
    </ContentPanel>
    <ContentPanel title="Car Details" separator wrap>
      <CarDetails />
    </ContentPanel>
  </Flex>
);

export default Garage;
