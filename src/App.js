import React from "react";
import { CSSReset } from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/core";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import Content from "./components/Content";
import { Box } from "@chakra-ui/core";
import Garage from "./components/Garage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
        <Box pos="fixed" w="100%" h="100%" top="0" left="0">
          <HeaderBar />
          <Content>
            <Switch>
              <Route path="/garage">
                <Garage />
              </Route>
            </Switch>
          </Content>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
