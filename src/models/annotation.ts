import { Line } from "./Line";

export class Annotation {
  constructor(public name: string, public lines: Line[]) {}

  public addLine(line: Line) {
    return new Annotation(this.name, this.lines.concat(line));
  }
}
