import { blue, red } from "colorette";
import fs from "fs";
import Git from "./git";
import { randomUUID } from "crypto";

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

const createApp = (
  user: string,
  repo: string,
  branch: string,
  name: string,
  resort: string,
  cwd: string,
  token?: string
) => {
  Git(user, repo, branch, token, cwd)
    .then((res: string) => {
      console.log("Creating " + name + " ...");
      if (res.split(" ")[0] != "\x1B[32mRepository") throw new Error();
      console.log(blue(`cd ${name}\tnpm\\yarn\\pnpm install`));
    })
    .catch((_: any) => console.log(red("Creation failed")))
    .finally(() => {
      let hash: string = randomUUID(),
        config: object = { recursive: true, force: true };
      try {
        if (fs.existsSync(resort)) {
          fs.renameSync(resort, hash);
          fs.rmSync(resort, config);
          fs.rmSync(cwd, config);
          fs.renameSync(hash, cwd);
          fs.rmSync(hash, config);
        }
      } catch (_: any) {
        console.log(_);
      }
    });
};

export { isEmptyDir, createApp };
