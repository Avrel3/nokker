import Axios from "axios";
import AdmZip from "adm-zip";
import { blue, green, red, yellow } from "colorette";

export default async function (
  user: string,
  repo: string,
  branch: string,
  token?: string
) {
  const git = `https://${
    token ? token + "@" : ""
  }github.com/${user}/${repo}/archive/refs/heads/${branch}.zip`;
  try {
    const resp = await Axios.get(git, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/zip",
      },
    });

    new AdmZip(resp.data).extractAllTo(process.cwd(), true, false);

    return green("Repository cloned");
  } catch (e: any) {
    if (e.message == "Request failed with status code 404") {
      return (
        yellow("Repository not found") +
        blue("\nPrivate repo -> Add Github token")
      );
    }
    return red(e.message);
  }
}
