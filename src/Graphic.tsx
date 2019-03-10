import React, { Component, RefObject } from "react";

type Point = {
  x: number;
  y: number;
};

class Line {
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number
  ) {}
}

type State = {
  lines: Line[];
  newLine: Line | null;
};

class Graphic extends Component {
  svgRef: any;
  svgDelta: Point = { x: 0, y: 0 };
  state: State = {
    lines: [],
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
      console.log(rect);
    }
  }

  onMouseDown = (ev: React.MouseEvent) => {
    const pt = this.getSvgPoint(ev);
    const newLine = new Line(pt.x, pt.y, pt.x, pt.y);
    this.setState({
      newLine: newLine
    });
  };
  onMouseMove = (ev: React.MouseEvent) => {
    const pt = this.getSvgPoint(ev);
    const oldLine = this.state.newLine;
    if (oldLine) {
      const newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);
      this.setState({
        newLine: newLine
      });
    }
  };
  onMouseUp = (ev: React.MouseEvent) => {
    const oldLine = this.state.newLine;
    if (!oldLine) {
      return;
    }
    const pt = this.getSvgPoint(ev);
    const newLine = new Line(oldLine.x1, oldLine.y1, pt.x, pt.y);

    this.setState({
      newLine: null,
      lines: this.state.lines.concat(newLine)
    });
  };

  getSvgPoint(ev: React.MouseEvent): Point {
    return {
      x: ev.clientX - this.svgDelta.x,
      y: ev.clientY - this.svgDelta.y
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
        width="800"
        height="600"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {this.state.lines.map((l, idx) => {
          return (
            <line
              key={idx}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="black"
            />
          );
        })}
        {newLine}
      </svg>
    );
  }
}

export default Graphic;
