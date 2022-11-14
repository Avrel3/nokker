import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { prompt } from "enquirer";
import { red, white } from "colorette";
import fs from "fs";
import path from "path";

import { mit, isc } from "./utils/license";
import Git from "./utils/git";
import { createApp } from "./utils/util";

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
      let lic: string = isc(user, year),
        cwd: string = path.join(process.cwd(), "LICENSE");
      if (type.toUpperCase() == "MIT") lic = mit(user, year);
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
  "create [name] [template]",
  "Creates project template",
  {
    name: {
      alias: "n",
      descrbe: "Name of the project",
      type: "string",
      required: true,
    },
    template: {
      alias: "t",
      describe: "Project template",
      type: "string",
      required: true,
      choices: ["react", "express"],
    },
  },
  async function ({ name, template }: { name: string; template: string }) {
    let cwd: string = path.resolve(process.cwd(), name);

    if (fs.existsSync(cwd))
      return console.log(white("fatal: ") + red(`${name} already exists`));

    switch (template) {
      case "react":
        console.log(`Creating ${template} App into ${name} ...`);
        createApp("Avrel3", "tw", "main", name, cwd);
        break;
      case "express":
        console.log(`Creating ${template} into ${name} ...`);
        createApp("Avrel3", "taseract", "main", name, cwd);
        break;
    }
  }
);

cli.recommendCommands().demandCommand().strict().argv;
