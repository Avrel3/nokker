import nokker from ".";

import Axios, { AxiosResponse } from "axios";
import crypto from "crypto";
import yargs from "yargs";

/// --- commands --- ///

// 1 - scrap
nokker.command(
  "scrap [url]",
  "Make HTTP request",
  (yarg: yargs.Argv) =>
    yarg.option("url", {
      alias: "u",
      type: "string",
      default: "https://cdn.delivr.net/gh/Avrel3/Avrel3/include.json",
      describe: "URL to make HTTP request",
    }),
  async function (argv: any) {
    try {
      const res: AxiosResponse = await Axios.get(argv.url);
      console.log(res.data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
);

// 1 - uid
nokker.command(
  "uid [len]",
  "Random crypto UUID",
  (yarg: yargs.Argv) => {
    yarg.positional("len", {
      type: "number",
      default: 8,
      describe: "Random UUID hex string",
    });
  },
  function (argv: any) {
    console.log(crypto.randomBytes(argv.len).toString("hex"));
  }
);

export default nokker;
