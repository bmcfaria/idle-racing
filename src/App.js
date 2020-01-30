import React from "react";
import { Button, CSSReset } from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/core";
import logo from "./logo.svg";
import "./App.css";
import HeaderBar from "./components/HeaderBar";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <HeaderBar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button variantColor="teal">Test</Button>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
