import { describe, expect, it } from "vitest";

import { parseMission, ERROR_MESSAGES } from "../src/services/parser";

describe("parseMission", () => {
  it("parses the challenge input format", () => {
    const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

    expect(parseMission(input)).toEqual({
      maxX: 5,
      maxY: 3,
      robots: [
        {
          x: 1,
          y: 1,
          orientation: "E",
          instructions: ["R", "F", "R", "F", "R", "F", "R", "F"],
        },
        {
          x: 3,
          y: 2,
          orientation: "N",
          instructions: ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"],
        },
        {
          x: 0,
          y: 3,
          orientation: "W",
          instructions: ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"],
        },
      ],
    });
  });

  it("rejects malformed robot pairs", () => {
    const input = `5 3
1 1 E`;

    expect(() => parseMission(input)).toThrow(
      ERROR_MESSAGES.INVALID_ROBOT_PAIRS
    );
  });

  it("rejects empty input", () => {
    const input = ``;

    expect(() => parseMission(input)).toThrow(ERROR_MESSAGES.EMPTY_INPUT);
  });

  it("rejects instruction sequences that are too long", () => {
    const input = `5 3
1 1 E
${"F".repeat(101)}`;

    expect(() => parseMission(input)).toThrow(
      ERROR_MESSAGES.INSTRUCTION_SEQUENCE_TOO_LONG
    );
  });

  it("rejects cordinates that are out of range", () => {
    const input = `5 3
51 1 E
RFRFRFRF`;

    expect(() => parseMission(input)).toThrow(
      ERROR_MESSAGES.INVALID_ROBOT_POSITION_RANGE
    );
  });

  it("rejects cordinates that are not integers", () => {
    const input = `5 3
1.5 1 E
RFRFRFRF`;

    expect(() => parseMission(input)).toThrow(
      ERROR_MESSAGES.INVALID_ROBOT_POSITION_FORMAT
    );
  });

  it("rejects invalid orientations", () => {
    const input = `5 3
1 1 X
RFRFRFRF`;

    expect(() => parseMission(input)).toThrow(
      ERROR_MESSAGES.INVALID_ROBOT_ORIENTATION
    );
  });
});