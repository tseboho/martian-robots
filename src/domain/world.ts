export class World {
  private scents = new Set<string>();

  constructor(
    public readonly maxX: number,
    public readonly maxY: number
  ) { }

  // Check if the given coordinates are within the bounds of the world
  isInBounds(x: number, y: number): boolean {
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  }

  // Check if there's a scent at the given coordinates
  hasScent(x: number, y: number): boolean {
    return this.scents.has(`${x},${y}`);
  }

  // Add a scent at the given coordinates
  addScent(x: number, y: number): void {
    this.scents.add(`${x},${y}`);
  }
}
