import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { prompt } from "enquirer";
import { green, red, white, yellow } from "colorette";
/// ---  --- ///
import crypto from "crypto";
import fs from "fs";
import path from "path";
//-- ---//
import license from "./license";
import Git from "./git";
// -- ---//
/// --- --- ///

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json")).toString()
);

const cli = yargs(hideBin(process.argv))
  .scriptName(config.name)
  .usage(`$0 <cmd> [args]`)
  .alias("v", "version")
  .alias("h", "help");

cli.command(
  "uid",
  "Generates random crypto hash",
  {
    length: {
      alias: "l",
      describe: "Length of the string",
      type: "number",
      default: 8,
    },
  },
  ({ length }: { length: number }) => {
    let res: string = crypto.randomBytes(length).toString("hex");
    console.log(res);
  }
);

cli.command(
  "mit",
  "Creates MIT License",
  {
    name: {
      alias: "n",
      describe: "Name of the user",
      type: "string",
      default: "",
    },
    year: {
      alias: "y",
      describe: "Year of the copyright",
      type: "number",
      default: new Date().getFullYear(),
    },
  },
  async function ({ name, year }: { name: string; year: number }) {
    try {
      const lic = license(name, year),
        cwd = path.join(process.cwd(), "LICENSE"),
        crt = (): void => {
          fs.writeFileSync(cwd, lic, {
            encoding: "utf-8",
          });
          console.info(green(`MIT LICENSE created at ${cwd}`));
        };
      if (fs.existsSync(cwd)) {
        const res: { proceed: boolean } = await prompt({
          type: "confirm",
          name: "proceed",
          message: "Would you like to overwrite the LICENSE file ?",
        });
        if (res.proceed) crt();
        return;
      }
      crt();
    } catch (e: any) {
      console.error(red(e.message));
    }
  }
);

cli.command(
  "clone",
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
          message: "Would you like to overwrite with current folder ?",
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

cli.help().recommendCommands().demandCommand().strict().argv;
