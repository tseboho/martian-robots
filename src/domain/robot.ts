import { Orientation, turnLeft, turnRight } from "./orientation";

export class Robot {
  constructor(
    public x: number,
    public y: number,
    public orientation: Orientation,
    public lost = false
  ) { }

  rotateLeft(): void {
    this.orientation = turnLeft(this.orientation);
  }

  rotateRight(): void {
    this.orientation = turnRight(this.orientation);
  }

  // Calculate the next position if the robot moves forward based on its current orientation
  moveForward(): { x: number; y: number } {
    switch (this.orientation) {
      case "N":
        return { x: this.x, y: this.y + 1 };
      case "E":
        return { x: this.x + 1, y: this.y };
      case "S":
        return { x: this.x, y: this.y - 1 };
      case "W":
        return { x: this.x - 1, y: this.y };
    }
  }

  // Set the robot's position to the given coordinates
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  // Mark the robot as lost
  markLost(): void {
    this.lost = true;
  }

  toString(): string {
    return `${this.x} ${this.y} ${this.orientation}${this.lost ? " LOST" : ""}`;
  }
}
