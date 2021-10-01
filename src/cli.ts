import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 20;
const DEFAULT_DELAY = 250;

const optionDefinitions = [
  { name: "help", alias: "h", type: Boolean },
  { name: "width", type: Number, multiple: false, defaultValue: DEFAULT_WIDTH },
  {
    name: "height",
    type: Number,
    multiple: false,
    defaultValue: DEFAULT_HEIGHT,
  },
  { name: "delay", type: Number, defaultValue: DEFAULT_DELAY },
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
        description: `Width of simulation in characters.  Defaults to ${DEFAULT_WIDTH}.`,
      },
      {
        name: "height",
        typeLabel: "{underline number}",
        type: Number,
        description: `Height of simulation in characters.  Defaults to ${DEFAULT_HEIGHT}.`,
      },
      {
        name: "delay",
        typeLabel: "{underline ms}",
        type: Number,
        description: `Time in millis between evolutions.  Defaults to ${DEFAULT_DELAY}.`,
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
        desc: "1. All defaults. ",
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

export default class CommandLine {
  private readonly _options: commandLineArgs.CommandLineOptions;
  constructor() {
    this._options = commandLineArgs(optionDefinitions);
  }

  get options() {
    return this._options;
  }

  usage = () => {
    console.log(commandLineUsage(sections));
  };
}
