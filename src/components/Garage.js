import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContentPanel from "./ContentPanel";
import CardCard from "./CardCar";

const CardExample = () => <Box h="2rem" bg="tomato" margin="0.2rem"></Box>;

const Divider = () => <Box w="100%" h="0" borderTop="1px solid black" />;

const Garage = () => (
  <Flex justifyContent="center">
    <ContentPanel>
      <CardCard />
      <Divider />
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
