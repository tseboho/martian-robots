import { describe, expect, it } from "vitest";

import { Robot } from "../src/domain/robot";
import { World } from "../src/domain/world";
import { Simulator } from "../src/services/simulator";

describe("Simulator", () => {
  it("rotates and moves a robot", () => {
    const world = new World(5, 3);
    const robot = new Robot(1, 1, "E");
    const simulator = new Simulator();

    simulator.execute(robot, ["R", "F", "R", "F", "R", "F", "R", "F"], world);

    expect(robot.toString()).toBe("1 1 E");
  });

  it("marks a robot as lost when moving out of bounds", () => {
    const world = new World(5, 3);
    const robot = new Robot(3, 2, "N");
    const simulator = new Simulator();

    simulator.execute(
      robot,
      ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"],
      world
    );

    expect(robot.toString()).toBe("3 3 N LOST");
  });

  it("ignores a dangerous move from a scented position", () => {
    const world = new World(5, 3);
    const simulator = new Simulator();

    const firstRobot = new Robot(3, 2, "N");
    simulator.execute(
      firstRobot,
      ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"],
      world
    );

    const secondRobot = new Robot(3, 3, "N");
    simulator.execute(secondRobot, ["F"], world);

    expect(secondRobot.toString()).toBe("3 3 N");
  });
});