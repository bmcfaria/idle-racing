import React from 'react';
import { CSSReset, Flex, ThemeProvider, theme } from '@chakra-ui/core';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import HeaderBar from './components/HeaderBar';
import Content from './components/Content';
import Garage from './components/Garage';
import Tabs from './components/Tabs';
import Race from './components/Race';
import Dealer from './components/Dealer';
import { Provider } from 'react-redux';
import configureStore from './state/configureStore';
import Home from './components/Home';
import Settings from './components/Settings';

const store = configureStore();

const BottomTabs = styled(Tabs)({
  '& > a': {
    flexGrow: 1,
  },
});

console.log(theme);

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `Righteous-Regular, ${theme.fonts.body}`,
    heading: `Righteous-Regular, ${theme.fonts.heading}`,
    mono: `Righteous-Regular, ${theme.fonts.mono}`,
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Provider store={store}>
        <BrowserRouter>
          <Flex
            direction="column"
            pos="fixed"
            w="100%"
            h="100%"
            top="0"
            left="0"
            style={{ fontFamily: 'Righteous-Regular' }}
          >
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
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route>
                  <Home />
                </Route>
              </Switch>
            </Content>
            <BottomTabs display={['flex', 'flex', 'none']} iconOnly />
          </Flex>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
