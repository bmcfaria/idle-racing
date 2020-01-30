import React from "react";
import { Box } from "@chakra-ui/core";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";

const Breadcrumbs = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

const HeaderBar = props => (
  <header>
    <Box bg="tomato" h="4rem">
      <Breadcrumbs />
    </Box>
  </header>
);

export default HeaderBar;
