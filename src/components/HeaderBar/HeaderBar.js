import React from "react";
import { Box } from "@chakra-ui/core";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";
import { Button, ButtonGroup } from "@chakra-ui/core";
import { Text } from "@chakra-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

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

const TabsButton = ({ to, children }) => {
  const match = useRouteMatch(to);
  return (
    <Button
      as={Link}
      to={to}
      variant={match ? "ghost" : "outline"}
      borderRadius="0"
      borderColor="black"
      bg={match ? "lightgray" : "none"}
    >
      {children}
    </Button>
  );
};

const Tabs = () => (
  <ButtonGroup spacing={0}>
    <TabsButton to="/garage">Garage</TabsButton>
    <TabsButton
      as={Link}
      to="/dealer"
      variant="ghost"
      borderRadius="0"
      bg="lightgray"
    >
      Dealer
    </TabsButton>
    <TabsButton to="/race">Race</TabsButton>
    <TabsButton to="/settings">Settings</TabsButton>
  </ButtonGroup>
);

const HeaderBar = props => (
  <header>
    <Box>
      <Flex align="center">
        <Title />
        <Tabs />
        <Box flexGrow="1" h="2.5rem" borderBottom="1px solid black" />
      </Flex>
      <Breadcrumbs />
    </Box>
  </header>
);

export default HeaderBar;
