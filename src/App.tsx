import React, { Component } from "react";
import "./App.css";
import Graphic from "./Graphic";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>create Lines (mouse down, mouse move, mouse up)</p>
        <Graphic />
      </div>
    );
  }
}

export default App;
