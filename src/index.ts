import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

// --- config --- //
const APP: string = "nokker";
const Args = yargs(hideBin(process.argv));
const nokker = Args.usage(`${APP} <cmd> [args]`);
// --- --- //

nokker.version(false);

nokker.options({
  h: { alias: "help", describe: "Show help" },
  v: { alias: "version", describe: "Show version" },
});

export default nokker;

import cmd from "./cmd";
cmd.strict().argv;