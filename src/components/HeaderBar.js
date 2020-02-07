import React from "react";
import { Box } from "@chakra-ui/core";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";
import { Text } from "@chakra-ui/core";
import { useRouteMatch, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";

const Breadcrumbs = () => {
  const location = useLocation();

  const matchGarage = useRouteMatch("/garage");
  const matchDealer = useRouteMatch("/dealer");
  const matchRace = useRouteMatch("/race");
  const matchSettings = useRouteMatch("/settings");

  let selectedPage;
  selectedPage = matchGarage ? "Garage" : selectedPage;
  selectedPage = matchDealer ? "Dealer" : selectedPage;
  selectedPage = matchRace ? "Race" : selectedPage;
  selectedPage = matchSettings ? "Settings" : selectedPage;

  let selectedPagePath = "/";
  selectedPagePath = matchGarage ? "/garage" : selectedPagePath;
  selectedPagePath = matchDealer ? "/dealer" : selectedPagePath;
  selectedPagePath = matchRace ? "/race" : selectedPagePath;
  selectedPagePath = matchSettings ? "/settings" : selectedPagePath;

  const selecterCar = !!location?.state?.car;
  console.log(selecterCar);

  return (
    <Breadcrumb addSeparator={false}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {selectedPage && (
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink as={Link} to={selectedPagePath}>
            {selectedPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {selecterCar && (
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink>Car</BreadcrumbLink>
        </BreadcrumbItem>
      )}
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
    <Text fontSize="xl">Idle Racing</Text>
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
