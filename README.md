# Martian Robots

CLI solution for the Red Badger Martian Robots challenge using TypeScript, Node.js, Yarn, and Vitest. The full problem description is located at PROBLEM.md

## Getting started

Install dependencies:

```bash
yarn install
```

### Available scripts

- `yarn start` runs the CLI with `ts-node`
- `yarn test` runs the Vitest suite once
- `yarn test:watch` runs Vitest in watch mode
- `yarn typecheck` runs the TypeScript compiler without emitting files

## Running the CLI

Run the CLI by passing an input file path:

```bash
yarn start input.txt
```

### Example

Given an input.txt file containing:

```bash
5 3

1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

Running:

```bash
yarn start input.txt
```

Should produce:

```bash
1 1 E

3 3 N LOST

2 3 S
```

## Project Layout

```txt
src/
  domain/
  services/
  index.ts
tests/
README.md
```

## Context

## TODO

- [x] Set up the project and development tooling
- [x] Confirm the CLI, typechecking, and test setup are working
- [ ] Model the core domain concepts
- [ ] Implement instruction execution
- [ ] Handle robot loss and scent tracking
- [ ] Support multiple robots within a shared world
- [ ] Parse input from the challenge format
- [ ] Complete the file-based CLI flow
- [ ] Add coverage for core behaviours and edge cases
- [ ] Finalise documentation and submission polish

### Scope

This solution is intentionally small and CLI-first. It focuses on the challenge rules, test coverage, and a clear separation between parsing, domain logic, and orchestration.

### Design Notes

- `src/domain` contains the stable movement rules and types.
- `src/services/parser.ts` handles the text input format separately from simulation.
- `src/services/simulator.ts` processes robots sequentially and owns scent persistence for a mission run.

### Assumptions

- Input is provided via reading from specified text files.
- Validation is lightweight and limited to malformed structure or invalid command/orientation values.
- Scent tracking is keyed by coordinate plus orientation. The scent is still attached to the last valid coordinate, but the orientation is needed to represent the specific off-grid move that must be ignored by later robots.
