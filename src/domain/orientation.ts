export type Orientation = "N" | "E" | "S" | "W";

// Left and right turns for each orientation
const LEFT_TURNS: Record<Orientation, Orientation> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

const RIGHT_TURNS: Record<Orientation, Orientation> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

// Functions to turn left and right from a given orientation
export function turnLeft(orientation: Orientation): Orientation {
  return LEFT_TURNS[orientation];
}

export function turnRight(orientation: Orientation): Orientation {
  return RIGHT_TURNS[orientation];
}
