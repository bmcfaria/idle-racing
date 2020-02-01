import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";

const CardExample = () => <Box h="2rem" bg="tomato" margin="0.2rem"></Box>;

const Garage = () => (
  <Flex justifyContent="center">
    <ContentPanel>
      <CardCard />
      <CardCard />
    </ContentPanel>
    <ContentPanel separator>
      <CardExample />
      <CardExample />
      <CardExample />
      <CardExample />
      <CardExample />
    </ContentPanel>
  </Flex>
);

export default Garage;
