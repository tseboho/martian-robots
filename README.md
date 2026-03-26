# Martian Robots

CLI solution for the Martian Robots challenge built with TypeScript, Node.js, Yarn, and Vitest. The full problem description is located at PROBLEM.md

## Getting started

Install dependencies:

```bash
yarn install
```

### Available scripts

- `yarn start <input-file>` runs the CLI with ts-node
- `yarn test` runs the Vitest suite once
- `yarn test:watch` runs Vitest in watch mode
- `yarn typecheck` runs the TypeScript compiler without emitting files

## Running the App (CLI)

Run the CLI by passing an input file path: `yarn start <some-file>.txt`.

Given an `input.txt` file containing:

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

**Bonus:** to enable logs while the Simulator runs, append `LOGS_ENABLED`:

```bash
LOGS_ENABLED=true yarn start input.txt
```

## Scope & approach

This solution is intentionally small and CLI-first. It focuses on the challenge rules, test coverage, and a clear separation between parsing, domain logic, and orchestration.

The problem was approached in three layers:

- Modelling the core domain concepts and simulation rules
- Parsing challenge input into structured data
- Wiring a small file-based CLI around that logic

This keeps the parsing, business rules, and entrypoint concerns separate while staying intentionally small.

TypeScript and Node were used as to stay aligned with the company's existing stack.

### Project Layout

```txt
inputs/
src/
  domain/
  services/
  utils/
  index.ts
tests/
README.md
```

- `src/domain` contains the stable movement rules and types.
- `src/services/parser.ts` handles the text input format separately from simulation.
- `src/services/simulator.ts` processes robots sequentially and owns scent persistence for a mission run.

### Assumptions

- Input is provided via reading from specified text files. No API or string input.
- Validation is lightweight and limited to malformed structure or invalid command/orientation values.
- Scent tracking is keyed by coordinate plus orientation. The scent is still attached to the last valid coordinate, but the orientation is needed to represent the specific off-grid move that must be ignored by later robots.

## Roadmap

### TODO

- [x] Set up the project and development tooling
- [x] Confirm the CLI, typechecking, and test setup are working
- [x] Model the core domain concepts
- [x] Implement instruction execution
- [x] Handle robot loss and scent tracking
- [x] Support multiple robots within a shared world
- [x] Parse input from the challenge format
- [x] Complete the file-based CLI flow
- [x] Add coverage for core behaviours and edge cases
- [x] Finalise documentation and submission polish

### Potential improvements (Future)

- [ ] Parser: When throwing a parsing error, include the line number and content of the offending line to aid in debugging.
- [ ] Parser: Consider discarding invalid lines and continuing to parse the rest of the input instead of throwing an error immediately.
- [ ] Index: Extend the app to take strings as input.
- [ ] Index: Add a REST endpoint receiving game input and returning the results.

## Verdict

This was a really fun exercise. I haven't flexed my Object Orientation skills in a long while, and its really fun to be reminded how much you can build with "bare bones" Node.JS — we've come a long way. Thank you.
