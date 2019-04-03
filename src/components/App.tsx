import React, { Component } from "react";
import "./App.css";
import Graphic from "./Graphic";
import { Annotation } from "../models/annotation";
import { Line } from "../models/Line";
import AnnotationList from "./AnnotationList";

type IState = {
  annotations: Annotation[];
  selectedAnnotation: Annotation | null;
};

class App extends Component {
  state: IState = {
    annotations: [],
    selectedAnnotation: null
  };

  onCreateLine = (line: Line): void => {
    if (this.state.selectedAnnotation) {
      const newAnnotation = this.state.selectedAnnotation.addLine(line);

      const newAnnotations = this.state.annotations.map(annotation => {
        if (annotation == this.state.selectedAnnotation) {
          return newAnnotation;
        } else {
          return annotation;
        }
      });
      this.setState({
        selectedAnnotation: newAnnotation,
        annotations: newAnnotations
      });
    } else {
      const newAnnotation = this.createNewAnnotation([line]);
      this.setState({
        annotations: this.state.annotations.concat(newAnnotation),
        selectedAnnotation: newAnnotation
      });
    }
  };

  onClearSelectedAnnotation = () => {
    this.setState({
      selectedAnnotation: null
    });
  };

  onNewAnnotation = () => {
    const newAnnotation = this.createNewAnnotation([]);
    this.setState({
      selectedAnnotation: newAnnotation,
      annotations: this.state.annotations.concat(newAnnotation)
    });
  };

  onClickAnnotation = (annotation: Annotation) => {
    this.setState({
      selectedAnnotation: annotation
    });
  };

  createNewAnnotation = (lines: Line[]) => {
    const newName = `Annotation-${this.state.annotations.length + 1}`;
    return new Annotation(newName, lines);
  };

  render() {
    return (
      <div className="App">
        <div className="ged">
          <h4>create lines (mouse down, mouse move, mouse up)</h4>
          <Graphic
            annotations={this.state.annotations}
            onCreateLine={this.onCreateLine}
          />
        </div>

        <div>
          <div>
            <button onClick={this.onClearSelectedAnnotation}>
              clear selected annotation
            </button>
            <button onClick={this.onNewAnnotation}>new annotation</button>
          </div>

          <AnnotationList
            onClickAnnotation={this.onClickAnnotation}
            selectedAnnotation={this.state.selectedAnnotation}
            annotations={this.state.annotations}
          />
        </div>
      </div>
    );
  }
}

export default App;
