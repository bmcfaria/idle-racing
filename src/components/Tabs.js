import React from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { GiHomeGarage, GiTrophyCup } from "react-icons/gi";
import { IoMdCar, IoMdSettings } from "react-icons/io";

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

const Tabs = ({ icon, iconOnly, ...props }) => (
  <ButtonGroup spacing={0} display="flex" {...props}>
    <TabsButton to="/garage">
      {(icon || iconOnly) && (
        <Box as={GiHomeGarage} marginRight={iconOnly ? "0" : "0.2rem"} />
      )}
      {!iconOnly && "Garage"}
    </TabsButton>
    <TabsButton to="/dealer">
      {(icon || iconOnly) && (
        <Box as={IoMdCar} marginRight={iconOnly ? "0" : "0.2rem"} />
      )}
      {!iconOnly && "Dealer"}
    </TabsButton>
    <TabsButton to="/race">
      {(icon || iconOnly) && (
        <Box as={GiTrophyCup} marginRight={iconOnly ? "0" : "0.2rem"} />
      )}
      {!iconOnly && "Race"}
    </TabsButton>
    <TabsButton to="/settings">
      {(icon || iconOnly) && (
        <Box as={IoMdSettings} marginRight={iconOnly ? "0" : "0.2rem"} />
      )}
      {!iconOnly && "Settings"}
    </TabsButton>
  </ButtonGroup>
);

export default Tabs;
