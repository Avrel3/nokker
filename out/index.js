"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const APP = "nokker";
const Args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv));
const nokker = Args.usage(`${APP} <cmd> [args]`);
nokker.options({
    h: { alias: ["help"], describe: "Show help" },
    v: { alias: ["version"], describe: "Show version" },
});
exports.default = nokker;
const cmd_1 = __importDefault(require("./cmd"));
cmd_1.default.strict().recommendCommands().argv;
