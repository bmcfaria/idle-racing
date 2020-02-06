import React from "react";
import { Box } from "@chakra-ui/core";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";
import { Text } from "@chakra-ui/core";
import { useRouteMatch } from "react-router-dom";
import Tabs from "./Tabs";

const Breadcrumbs = () => {
  const matchGarage = useRouteMatch("/garage");
  const matchDealer = useRouteMatch("/dealer");
  const matchRace = useRouteMatch("/race");
  const matchSettings = useRouteMatch("/settings");

  let selectedPage = "";
  selectedPage = matchGarage ? "Garage" : selectedPage;
  selectedPage = matchDealer ? "Dealer" : selectedPage;
  selectedPage = matchRace ? "Race" : selectedPage;
  selectedPage = matchSettings ? "Settings" : selectedPage;

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{selectedPage}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const Title = () => (
  <Flex
    h="2.5rem"
    align="center"
    paddingLeft="1rem"
    paddingRight="1rem"
    borderBottom="1px solid black"
  >
    <Text fontSize="xl">Iddle Racing</Text>
  </Flex>
);

const HeaderBar = () => (
  <header>
    <Box>
      <Flex align="center">
        <Title />
        <Tabs display={["none", "none", "flex"]} icon />
        <Box flexGrow="1" h="2.5rem" borderBottom="1px solid black" />
      </Flex>
      <Breadcrumbs />
    </Box>
  </header>
);

export default HeaderBar;
