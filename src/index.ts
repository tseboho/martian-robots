import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { Robot } from "./domain/robot";
import { World } from "./domain/world";
import { Simulator } from "./services/simulator";
import { parseMission } from "./services/parser";

const main = (): void => {
  const inputFilePath = process.argv[2];

  if (!inputFilePath) {
    console.error("Usage: yarn start <input-file>");
    process.exit(1);
  }

  try {
    const fileContents = readFileSync(resolve(inputFilePath), "utf-8");
    const mission = parseMission(fileContents);

    const world = new World(mission.maxX, mission.maxY);
    const simulator = new Simulator();

    const results = mission.robots.map(({ x, y, orientation, instructions }) => {
      const robot = new Robot(x, y, orientation);
      simulator.execute(robot, instructions, world);
      return robot.toString();
    });

    console.log(results.join("\n"));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    console.error(message);
    process.exit(1);
  }
};

main();