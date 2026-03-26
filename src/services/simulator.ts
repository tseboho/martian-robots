import { Instruction, LEFT, RIGHT, FORWARD } from "../domain/instruction";
import { Robot } from "../domain/robot";
import { World } from "../domain/world";
import { logger } from "../utils/logger";

export class Simulator {
  execute(robot: Robot, instructions: Instruction[], world: World): Robot {
    logger.log(`>>> World bounds: (${world.maxX}, ${world.maxY})`);
    logger.log(`>>> Starting simulation for robot at position (${robot.x}, ${robot.y}) facing ${robot.orientation}`);
    logger.log(`>>> Instructions: ${instructions.join(" ")}`);

    for (const instruction of instructions) {
      // If the robot is already lost, we stop processing further instructions
      if (robot.lost) {
        break;
      }

      // Handle left rotation instructions
      if (instruction === LEFT) {
        robot.rotateLeft();
        logger.log(`>>> Robot LEFT to ${robot.orientation}`);
        continue;
      }

      // Handle right rotation instructions
      if (instruction === RIGHT) {
        robot.rotateRight();
        logger.log(`>>> Robot RIGHT to ${robot.orientation}`);
        continue;
      }

      // Handle forward movement
      if (instruction === FORWARD) {
        const nextPosition = robot.moveForward();

        // If the next position is within bounds, move the robot there
        if (world.isInBounds(nextPosition.x, nextPosition.y)) {
          robot.setPosition(nextPosition.x, nextPosition.y);
          logger.log(`>>> Robot FORWARD to position (${robot.x}, ${robot.y}) facing ${robot.orientation}`);
          continue;
        }

        // If the next position is out of bounds, check if there's a scent to ignore this move
        if (world.hasScent(robot.x, robot.y)) {
          logger.log(`>>> Ignoring dangerous move from position (${robot.x}, ${robot.y}) facing ${robot.orientation} due to scent`);
          continue;
        }

        // If there's no scent, mark the robot as lost and add a scent to the world
        world.addScent(robot.x, robot.y);
        robot.markLost();

        logger.log(`>>> Robot lost at position (${robot.x}, ${robot.y}) facing ${robot.orientation}`);
      }
    }

    logger.log(`>>> Robot FINAL position was "${robot.toString()}"\n`);
    return robot;
  }
}