import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { prompt } from "enquirer";
import { red, white, yellow } from "colorette";
/// ---  --- ///
import fs from "fs";
import path from "path";
//-- ---//
import * as license from "./utils/license";
import Git from "./utils/git";
import { dir } from "console";
// -- ---//
/// --- --- ///

const cli = yargs(hideBin(process.argv))
  .scriptName("nokker")
  .usage(`$0 <cmd> [args]`)
  .alias("v", "version")
  .alias("h", "help");

cli.command(
  "git [user] [repo] [branch] [token]",
  "Clone Github repository",
  {
    user: {
      alias: "u",
      describe: "Username",
      type: "string",
      required: true,
    },
    repo: {
      alias: "r",
      describe: "Repository",
      type: "string",
      required: true,
    },
    branch: {
      alias: "b",
      describe: "Branch",
      type: "string",
      default: "main",
    },
    token: {
      alias: "t",
      describe: "Token",
      type: "string",
    },
  },
  async function ({
    user,
    repo,
    branch,
    token,
  }: {
    user: string;
    repo: string;
    branch: string;
    token?: string;
  }) {
    try {
      let dir: string = path.resolve(process.cwd(), repo + "-" + branch);
      if (fs.existsSync(dir)) {
        let resp: { proceed: boolean } = await prompt({
          type: "confirm",
          name: "proceed",
          message: "Would you like to overwrite with current repository ?",
        });
        (resp.proceed
          ? async () => {
              let result: string = await Git(user, repo, branch, token);
              return console.log("> " + result);
            }
          : () => console.log(white("> ") + yellow("Cancelled")))();
      } else {
        let result: string = await Git(user, repo, branch, token);
        return console.log(result);
      }
    } catch (e: any) {
      console.error(red("Task failed"));
    }
  }
);

cli.command(
  "lic [type] [name] [year]",
  "Creates License",
  {
    type: {
      alias: "t",
      describe: "License [MIT or ISC]",
      type: "string",
      default: "ISC",
    },
    user: {
      alias: "u",
      describe: "Name of the user",
      type: "string",
      default: "",
    },
    year: {
      alias: "n",
      describe: "Year of the copyright",
      type: "number",
      default: new Date().getFullYear(),
    },
    yes: {
      alias: "y",
      describe: "force",
      type: "boolean",
      default: false,
    },
  },
  async function ({
    type,
    user,
    year,
    yes,
  }: {
    type: string;
    user: string;
    year: number;
    yes: boolean;
  }) {
    try {
      let lic: string = license.isc(user, year);
      let cwd: string = path.join(process.cwd(), "LICENSE");
      if (type.toUpperCase() == "MIT") lic = license.mit(user, year);
      let crt = (): void => {
        fs.writeFileSync(cwd, lic, {
          encoding: "utf-8",
        });
      };
      if (yes) crt();
      if (fs.existsSync(cwd)) {
        const res: { proceed: boolean } = await prompt({
          type: "confirm",
          name: "proceed",
          message: "Would you like to overwrite the LICENSE ?",
        });
        if (res.proceed) crt();
      } else crt();
    } catch (e: any) {
      console.error(red(e.message));
    }
  }
);

cli.command(
  "create [name]",
  "Creates react app with ts, tailwind && parcel",
  {
    name: {
      alias: "n",
      descrbe: "Name of the project",
      type: "string",
      default: ".",
    },
  },
  async function ({ name }: { name: string }) {
    function isEmptyDir(loc: string) {
      try {
        const directory = fs.opendirSync(loc);
        const entry = directory.readSync();
        directory.close();
        return entry === null;
      } catch (error) {
        return false;
      }
    }
    let cwd: string = path.resolve(process.cwd(), name);
    let resort: string = path.join(cwd, "tw-main");
    const temp = () => {
      Git("Avrel3", "tw", "main", undefined, cwd)
        .then((res: string) => {
          if (res.split(" ")[0] != "\x1B[32mRepository") throw new Error();
        })
        .catch((e: any) => {
          console.log(red("Creation failed"));
        })
        .finally(() => {
          fs.renameSync(resort, cwd +" ");
          fs.rmSync(resort, { recursive: true, force: true });
        });
    };
    if (!fs.existsSync(cwd)) return temp();
    if (!isEmptyDir(cwd)) return console.log(red("fatal: Folder not empty"));
    temp();
  }
);

cli.recommendCommands().demandCommand().strict().argv;
