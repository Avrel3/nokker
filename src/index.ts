import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { prompt } from "enquirer";
import { blue, red, white, yellow } from "colorette";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

import * as license from "./utils/license";
import Git from "./utils/git";
import { isEmptyDir } from "./utils/util";

const cli = yargs(hideBin(process.argv))
  .scriptName("nokker")
  .usage(`$0 <cmd> [args]`)
  .alias("v", "version")
  .alias("h", "help");

cli.command(
  "clone [user] [repo] [branch] [token]",
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
    let folder: string = repo + "-" + branch,
      dir: string = path.join(process.cwd(), folder);
    if (fs.existsSync(dir))
      return console.log(
        white("fatal: ") + red(`Folder ${folder} already exists`)
      );
    console.log("Cloning into " + folder + " ...");
    const res: string = await Git(user, repo, branch, token);
    console.log(res);
  }
);

cli.command(
  "lic [type] [user] [year]",
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
      default: "John doe",
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
      if (yes) return crt();
      if (fs.existsSync(cwd)) {
        const res: { proceed: boolean } = await prompt({
          type: "confirm",
          name: "proceed",
          message: "Would you like to overwrite the LICENSE ?",
        });
        if (res.proceed) crt();
      } else crt();
    } catch (e: any) {
      console.log(red(e.message));
    }
  }
);

cli.command(
  "create [name]",
  "Creates react app with ts, tailwind & parcel",
  {
    name: {
      alias: "n",
      descrbe: "Name of the project",
      type: "string",
      default: ".",
    },
  },
  async function ({ name }: { name: string }) {
    let cwd: string = path.resolve(process.cwd(), name),
      resort: string = path.join(cwd, "tw-main");
    const temp = () => {
      Git("Avrel3", "tw", "main", undefined, cwd)
        .then((res: string) => {
          console.log("Creating " + name + " ...");
          if (res.split(" ")[0] != "\x1B[32mRepository") throw new Error();
          console.log(blue(`cd ${name}\tnpm\\yarn\\pnpm install`));
        })
        .catch((_: any) => {
          console.log(red("Creation failed"));
        })
        .finally(() => {
          let hash: string = randomUUID(),
            config: object = { recursive: true, force: true };
          try {
            if (fs.existsSync(resort)) {
              fs.renameSync(resort, hash);
              fs.rmSync(resort, config);
              // if (fs.existsSync(cwd)) {
              // fs.rmSync(cwd, config);
              // fs.renameSync(hash, cwd);
              // fs.rmSync(hash, config);
              // }
            }
          } catch (_: any) {}
        });
    };
    if (!fs.existsSync(cwd)) return temp();
    if (!isEmptyDir(cwd)) return console.log(red("fatal: Directory not empty"));
    temp();
  }
);

cli.recommendCommands().demandCommand().strict().argv;
