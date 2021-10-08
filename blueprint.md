# Conway's Game of Life

{{ template:logo }}

{{ template:title }}

{{ template:badges }}

{{ template:description }}

{{ template:toc }}

## Usage

To run the simulation: `yarn game.js`.

{{ pkg.scripts }}

## Configuration

To see available configuration: `yarn --help`.

```
Presets

  --blinker    Simple simulation of constant blinker evolution
  --glider     Simple simulation of moving glider shape
  --block      4 cell still life

Options

  --width number    Width of simulation in characters.  Defaults to 20.
  --height number   Height of simulation in characters.  Defaults to 20.
  --delay ms        Time in millis between evolutions.  Defaults to 250.
  -h, --help        Print this usage guide.

Examples

  1. All defaults.          $ yarn game
  2. A slower evolution.    $ yarn game --delay 1000
  3. A bigger simulation    $ yarn game --width 25 --height 40
```

## Dependencies

{{ pkg.dependencies }}

{{ template:contributors }}

{{ template:license }}
