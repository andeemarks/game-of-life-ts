#!/usr/bin/env node
import { Generation, EntropyError } from "./generation";
import Board from "./board";
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

function seed(gen: Generation): Generation {
  gen.seed(4, 5);
  gen.seed(5, 6);
  gen.seed(5, 7);
  gen.seed(4, 7);
  gen.seed(6, 7);

  return gen;
}

async function gameLoop(): Promise<void> {
  const optionDefinitions = [
    { name: "help", alias: "h", type: Boolean },
    { name: "width", type: Number, multiple: false, defaultValue: 20 },
    { name: "height", type: Number, multiple: false, defaultValue: 20 },
    { name: "delay", type: Number, defaultValue: 250 },
  ];

  const sections = [
    {
      header: "Game of Life",
      content: "Terminal version of {bold Conway's Game of Life} simulation.",
    },
    {
      header: "Options",
      optionList: [
        {
          name: "width",
          typeLabel: "{underline number}",
          type: Number,
          description: "Width of simulation in characters.  Defaults to 20.",
        },
        {
          name: "height",
          typeLabel: "{underline number}",
          type: Number,
          description: "Height of simulation in characters.  Defaults to 20.",
        },
        {
          name: "delay",
          typeLabel: "{underline ms}",
          type: Number,
          description: "Time in millis between evolutions.  Defaults to 250.",
        },
        {
          name: "help",
          alias: "h",
          type: Boolean,
          description: "Print this usage guide.",
        },
      ],
    },
    {
      header: "Examples",
      content: [
        {
          desc: "1. All defaults (20x20 with 250ms delay). ",
          example: "$ yarn game",
        },
        {
          desc: "2. A slower evolution. ",
          example: "$ yarn game --delay 1000",
        },
        {
          desc: "3. A bigger simulation ",
          example: "$ yarn game --width 25 --height 40",
        },
      ],
    },
  ];

  const options = commandLineArgs(optionDefinitions);
  const usage = commandLineUsage(sections);

  if (options.help) {
    console.log(usage);
  } else {
    let current: Generation = new Generation(options.width, options.height);
    current = seed(current);

    const board: Board = new Board();
    board.show(current);

    let isEvolving = true;
    while (isEvolving) {
      try {
        current = current.regenerate();
        board.show(current);
        await delay(options.delay);
      } catch (error) {
        if (error instanceof EntropyError) isEvolving = false;
      }
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

gameLoop();

export {};
