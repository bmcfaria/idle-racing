import React from "react";
import { Box } from "@chakra-ui/core";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";
import { Text } from "@chakra-ui/core";
import Tabs from "./Tabs";

const Breadcrumbs = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Garage</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

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
