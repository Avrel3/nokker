import fs from "fs";
import path from "path";
import { prompt } from "enquirer";
import Axios from "axios";
import { red } from "colorette";

const io = (i: string): string =>
  `https://www.toptal.com/developers/gitignore/api/${i}`;

async function createIgnore(name: string, ignore: string) {
  try {
    const response: any = await Axios.get(io(name));
    fs.writeFileSync(ignore, await response.data, { encoding: "utf8" });
  } catch (e: any) {
    console.log(red(e.message));
    console.log(
      "visit https://www.toptal.com/developers/gitignore for template"
    );
  }
}

export default async function (name: string, yes: boolean) {
  const ignore: string = path.join(process.cwd(), ".gitignore");

  try {
    if (yes && name === "empty") return fs.writeFileSync(ignore, "");

    if (fs.existsSync(ignore)) {
      if (yes) return await createIgnore(name, ignore);
      const go: { proceed: boolean } = await prompt({
        type: "confirm",
        name: "proceed",
        message: "Would you like to overwrite the .gitignore?",
      });
      if (!go.proceed) return;
      if (name === "empty") return fs.writeFileSync(ignore, "");
      await createIgnore(name, ignore);
    }
    if (name === "empty") return fs.writeFileSync(ignore, "");
    await createIgnore(name, ignore);
  } catch (e: any) {
    console.error(red(e.message));
  }
}
