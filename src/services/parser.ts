import { Instruction, INSTRUCTIONS } from "../domain/instruction";
import { Orientation, ORIENTATIONS } from "../domain/orientation";

/**
 * Parses the input string for the Martian Robots mission and returns a structured representation of the grid and robot instructions.
 * The input format is expected to be:
 * - The first line contains the upper-right coordinates of the grid (e.g., "5 3").
 * - Subsequent lines come in pairs:
 *   - The first line of each pair contains the initial position and orientation of a robot (e.g., "1 1 E").
 *   - The second line of each pair contains a sequence of instructions for that robot (e.g., "RFRFRFRF").
 *
 * @param input - The raw input string representing the mission configuration.
 * @returns A structured object containing the grid dimensions and an array of robot configurations.
 * @throws Will throw an error if the input format is invalid or if any part of the input cannot be parsed correctly.
 * Validation rules:
 * - The grid definition must consist of two integers.
 * - Each robot definition must consist of two integers followed by a valid orientation (N, E, S, W).
 * - Each instruction line must consist of valid instructions (L, R, F) and cannot be empty.
 * - The number of robot lines must be even, as they come in pairs of position and instruction lines.
 * - Coordinate values cannot be greater than 50.
 * - Instruction sequences must not longer than 100 characters.
 * 
 */

export const ERROR_MESSAGES = {
  INVALID_GRID_DEFINITION: "Invalid grid definition. Expected two integer coordinates.",
  INVALID_ROBOT_POSITION_RANGE: "Invalid robot position. Coordinates cannot be greater than 50.",
  INVALID_ROBOT_POSITION_FORMAT: "Invalid robot position. Expected two integer coordinates.",
  INVALID_ROBOT_ORIENTATION: "Invalid robot orientation. Expected one of N, E, S, W.",
  INSTRUCTION_SEQUENCE_TOO_LONG: "Instruction sequence too long. Maximum length is 100 characters.",
  EMPTY_INSTRUCTION_LINE: "Instruction line cannot be empty.",
  INVALID_INSTRUCTION_SEQUENCE: "Invalid instruction sequence. Expected only L, R, F.",
  EMPTY_INPUT: "Input cannot be empty.",
  INVALID_ROBOT_PAIRS: "Invalid robot input. Expected pairs of position and instruction lines.",
} as const;

export interface ParsedRobotInput {
  x: number;
  y: number;
  orientation: Orientation;
  instructions: Instruction[];
}

export interface ParsedMission {
  maxX: number;
  maxY: number;
  robots: ParsedRobotInput[];
}


const isOrientation = (value: string): value is Orientation => {
  return ORIENTATIONS.includes(value as Orientation);
};

const isInstruction = (value: string): value is Instruction => {
  return INSTRUCTIONS.includes(value as Instruction);
};

const parseGridLine = (line: string): { maxX: number; maxY: number } => {
  const [rawMaxX, rawMaxY] = line.split(/\s+/);

  const maxX = Number(rawMaxX);
  const maxY = Number(rawMaxY);

  if (!Number.isInteger(maxX) || !Number.isInteger(maxY)) {
    throw new Error(ERROR_MESSAGES.INVALID_GRID_DEFINITION);
  }

  return { maxX, maxY };
};

const parseRobotLine = (
  line: string
): { x: number; y: number; orientation: Orientation } => {
  const [rawX, rawY, rawOrientation] = line.split(/\s+/);

  const x = Number(rawX);
  const y = Number(rawY);

  // NOTE: This is a core validation rule to prevent robots from being placed outside the defined grid, which could lead to undefined behavior in the simulation.
  if (x > 50 || y > 50) {
    throw new Error(ERROR_MESSAGES.INVALID_ROBOT_POSITION_RANGE);
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error(ERROR_MESSAGES.INVALID_ROBOT_POSITION_FORMAT);
  }

  if (!rawOrientation || !isOrientation(rawOrientation)) {
    throw new Error(ERROR_MESSAGES.INVALID_ROBOT_ORIENTATION);
  }

  return {
    x,
    y,
    orientation: rawOrientation,
  };
};

const parseInstructionLine = (line: string): Instruction[] => {
  const instructions = line.split("");

  // NOTE: This is a core validation rule to prevent excessively long instruction sequences that could cause performance issues or memory overflow.
  if (instructions.length > 100) {
    throw new Error(ERROR_MESSAGES.INSTRUCTION_SEQUENCE_TOO_LONG);
  }

  if (instructions.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_INSTRUCTION_LINE);
  }

  if (!instructions.every(isInstruction)) {
    throw new Error(ERROR_MESSAGES.INVALID_INSTRUCTION_SEQUENCE);
  }

  return instructions;
};

export const parseMission = (input: string): ParsedMission => {
  // Split the input into lines, trim whitespace, and filter out empty lines
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Validate that the input is not empty
  if (lines.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
  }

  // Parse the grid definition from the first line
  const { maxX, maxY } = parseGridLine(lines[0]);
  // Parse the robot definitions from the remaining lines
  const robotLines = lines.slice(1);

  // Validate that robot lines come in pairs (position line followed by instruction line)
  if (robotLines.length % 2 !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_ROBOT_PAIRS);
  }

  const robots: ParsedRobotInput[] = [];

  for (let index = 0; index < robotLines.length; index += 2) {
    const positionLine = robotLines[index];
    const instructionLine = robotLines[index + 1];

    const { x, y, orientation } = parseRobotLine(positionLine); // Parse the robot's initial position and orientation
    const instructions = parseInstructionLine(instructionLine); // Parse the robot's instruction sequence

    robots.push({
      x,
      y,
      orientation,
      instructions,
    });
  }

  return {
    maxX,
    maxY,
    robots,
  };
};
