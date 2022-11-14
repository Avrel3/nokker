import fs from "fs";

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

export { isEmptyDir };
