import React from "react";
import { CSSReset, Flex, ThemeProvider } from "@chakra-ui/core";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "@emotion/styled";
import HeaderBar from "./components/HeaderBar";
import Content from "./components/Content";
import Garage from "./components/Garage";
import Tabs from "./components/Tabs";
import Race from "./components/Race";
import Dealer from "./components/Dealer";

const BottomTabs = styled(Tabs)({
  "& > a": {
    flexGrow: 1
  }
});

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
        <Flex direction="column" pos="fixed" w="100%" h="100%" top="0" left="0">
          <HeaderBar />
          <Content flexGrow="1">
            <Switch>
              <Route path="/garage">
                <Garage />
              </Route>
              <Route path="/race">
                <Race />
              </Route>
              <Route path="/dealer">
                <Dealer />
              </Route>
            </Switch>
          </Content>
          <BottomTabs display={["flex", "flex", "none"]} iconOnly />
        </Flex>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
