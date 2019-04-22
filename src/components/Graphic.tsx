import React, { Component } from "react";
import { Annotation } from "../models/annotation";
import { Line } from "../models/Line";

type Point = {
  x: number;
  y: number;
};

type State = {
  newLine: Line | null;
};

interface IProps {
  annotations: Annotation[];
  onCreateLine(line: Line): void;
}

class Graphic extends Component<IProps> {
  svgRef: any;
  state: State = {
    newLine: null
  };

  constructor(props: any) {
    super(props);
    this.svgRef = React.createRef();
    // this.state.lines.push({ x1: 40, y1: 70, x2: 150, y2: 200 });
  }

  onTouchStart = (ev: React.TouchEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.touches.length > 0) {
      this.onPointerDown(ev.touches[0].clientX, ev.touches[0].clientY);
    }
  };
  onMouseDown = (ev: React.MouseEvent) => {
    this.onPointerDown(ev.clientX, ev.clientY);
  };
  onPointerDown = (clientX: number, clientY: number) => {
    const pt = this.getSvgPoint(clientX, clientY);
    const newLine = new Line(pt.x, pt.y, pt.x, pt.y);
    this.setState({
      newLine: newLine
    });
  };

  onTouchMove = (ev: React.TouchEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.touches.length > 0) {
      this.onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY);
    }
  };
  onMouseMove = (ev: React.MouseEvent) => {
    this.onPointerMove(ev.clientX, ev.clientY);
  };
  onPointerMove = (clientX: number, clientY: number) => {
    const pt = this.getSvgPoint(clientX, clientY);
    const oldLine = this.state.newLine;
    if (oldLine) {
      const newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);
      this.setState({
        newLine: newLine
      });
    }
  };

  onTouchEnd = (ev: React.TouchEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    // touchend event has no touches values
    this.onPointerUp(null, null);
  };
  onMouseUp = (ev: React.MouseEvent) => {
    this.onPointerUp(ev.clientX, ev.clientY);
  };
  onPointerUp = (clientX: number | null, clientY: number | null) => {
    const oldLine = this.state.newLine;
    if (!oldLine) {
      return;
    }
    let newLine = oldLine;
    if (clientX && clientY) {
      const pt = this.getSvgPoint(clientX, clientY);
      newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);
    }
    this.setState({
      newLine: null
    });
    this.props.onCreateLine(newLine);
  };

  getSvgPoint(clientX: number, clientY: number): Point {
    const rect = this.svgRef.current.getBoundingClientRect();
    return {
      x: clientX - rect.x,
      y: clientY - rect.y
    };
  }

  render() {
    let newLine = null;
    const nl = this.state.newLine;
    if (nl) {
      newLine = (
        <line x1={nl.x1} y1={nl.y1} x2={nl.x2} y2={nl.y2} stroke="blue" />
      );
    }

    // https://stackoverflow.com/questions/42101723/unable-to-preventdefault-inside-passive-event-listener
    const style = {
      touchAction: "none"
    };
    return (
      <svg
        ref={this.svgRef}
        width="700"
        height="500"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        style={style}
      >
        {this.props.annotations.map((annotation, aIdx) => {
          return annotation.lines.map((l, lIdx) => {
            return (
              <line
                key={`${aIdx}-${lIdx}`}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="black"
              />
            );
          });
        })}
        {newLine}
      </svg>
    );
  }
}

export default Graphic;
