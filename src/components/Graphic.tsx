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
  svgDelta: Point = { x: 0, y: 0 };
  state: State = {
    newLine: null
  };

  constructor(props: any) {
    super(props);
    this.svgRef = React.createRef();
    // this.state.lines.push({ x1: 40, y1: 70, x2: 150, y2: 200 });
  }

  componentDidMount() {
    if (this.svgRef) {
      const rect = this.svgRef.current.getBoundingClientRect();
      this.svgDelta = { x: rect.x, y: rect.y };
    }
  }

  // onTouchStart = (ev: React.TouchEvent) => {
  //   if (ev.touches.length > 0) {
  //     ev.stopPropagation();
  //     ev.preventDefault();
  //     this.onPointer_Down(ev.touches[0].clientX, ev.touches[0].clientY);
  //   }
  // };
  // onMouseDown = (ev: React.MouseEvent) => {
  //   this.onPointer_Down(ev.clientX, ev.clientY);
  // };
  // onPointerDown = (ev: React.PointerEvent) => {
  //   console.log("::", ev.clientX);
  //   this.onPointer_Down(ev.clientX, ev.clientY);
  // };
  // onPointer_Down = (clientX: number, clientY: number) => {

  onPointerDown = (ev: React.PointerEvent) => {
    const pt = this.getSvgPoint(ev.clientX, ev.clientY);
    const newLine = new Line(pt.x, pt.y, pt.x, pt.y);
    this.setState({
      newLine: newLine
    });
  };

  // onTouchMove = (ev: React.TouchEvent) => {
  //   if (ev.touches.length > 0) {
  //     ev.stopPropagation();
  //     ev.preventDefault();
  //     this.onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY);
  //   }
  // };
  // onMouseMove = (ev: React.MouseEvent) => {
  //   this.onPointerMove(ev.clientX, ev.clientY);
  // };
  // onPointerMove = (clientX: number, clientY: number) => {
  onPointerMove = (ev: React.PointerEvent) => {
    const pt = this.getSvgPoint(ev.clientX, ev.clientY);
    console.log(":move:", pt);
    const oldLine = this.state.newLine;
    if (oldLine) {
      const newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);
      this.setState({
        newLine: newLine
      });
    }
  };

  // onTouchEnd = (ev: React.TouchEvent) => {
  //   if (ev.touches.length > 0) {
  //     this.onPointerUp(ev.touches[0].clientX, ev.touches[0].clientY);
  //   }
  // };
  // onMouseUp = (ev: React.MouseEvent) => {
  //   this.onPointerUp(ev.clientX, ev.clientY);
  // };
  // onPointerUp = (clientX: number, clientY: number) => {
  onPointerUp = (ev: React.PointerEvent) => {
    const oldLine = this.state.newLine;
    if (!oldLine) {
      return;
    }
    const pt = this.getSvgPoint(ev.clientX, ev.clientY);
    const newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);

    this.setState({
      newLine: null
    });
    this.props.onCreateLine(newLine);
  };

  getSvgPoint(clientX: number, clientY: number): Point {
    return {
      x: clientX - this.svgDelta.x,
      y: clientY - this.svgDelta.y
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
    return (
      <svg
        ref={this.svgRef}
        width="700"
        height="500"
        // onMouseDown={this.onMouseDown}
        // onMouseMove={this.onMouseMove}
        // onMouseUp={this.onMouseUp}
        // onTouchStart={this.onTouchStart}
        // onTouchMove={this.onTouchMove}
        // onTouchEnd={this.onTouchEnd}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
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
